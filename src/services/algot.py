import pandas as pd
import json
import requests
from urllib.request import urlopen 

# WHEN USING THIS, PLEASE DOWNLOAD THE CSV AND JSON FILES AND CHANGE THE PATHS TO YOURS

# tag genome for movies
#url1 = "http://128.214.253.51:3000/dbgettags"
#page = urlopen(url1)
#html_bytes = page.read()
#tg_movies = html_bytes.decode("utf-8")
#print(tg_movies)
#link1 = "http://128.214.253.51:3000/dbgettags"
#tg_movies = requests.get("http://128.214.253.51:3000/dbgettags")
#tg_movies.text
#print(tg_movies)

tg_movies = pd.read_csv("/home/seppaemi/Documents/deniksen algo/se_project/tagdl_movies.csv")

# tag genome for books
tg_books = pd.read_csv("/home/seppaemi/Documents/deniksen algo/se_project/tagdl_books.csv")
tg_books.head()

# book titles, authors, etc.
def read_metadata(filename):
    lines = open(filename, "r").readlines()
    array = []
    for line in lines:
        obj = json.loads(line)
        array.append(obj)
    df = pd.DataFrame(array)
    return df
books = read_metadata("/home/seppaemi/Documents/deniksen algo/se_project/metadata_books.json")
books.head()

# movie titles, cast, etc.
movies = read_metadata("/home/seppaemi/Documents/deniksen algo/se_project/metadata_movies.json")
movies.head()

# Calculating the intersection of tags between tag genome for movies and books

book_tags = set(tg_books.tag.unique())
movie_tags = set(tg_movies.tag.unique())
common_tags = book_tags.intersection(movie_tags)
len(common_tags)

# Each book or movie is represented as a vector in a multidimentional space, where each dimension corresponds to a tag.
# This allows us to compare the vectors using cosine similarity:
# https://en.wikipedia.org/wiki/Cosine_similarity
# The higher the cosine the more similar is an item to another item.

# To generate personalized recommendations, we represent a user as a vector (user profile).
# The user vector is based on movies and books that the user has rated.
# Ratings 3, 4 and 5 have positive contributions to the vector, while 2 and 1 - negative.
# After we have built the user vector, we calculate similarity of this vector to vectors of movies and books.
# The higher the similarity the more likely that the user is going to like the recommendation.
# Tag genomes for movies and books contain different tags, but have an intersection of tags.
# For simplicity, we calculate similarity between user and item vectors only for the tags common for books and movies.

# finding books
books[books.title.isin(["Misery", "It"])]

# finding movies
movies[movies.item_id.isin([1270, 5445, 7361])]

# We assume that there is a user, who likes horror and time travel, but hates romance.
# They provided the following ratings to books and movies

ratings = {"movies" : [{"item_id" : 1270, "rating" : 4},
                       {"item_id" : 5445, "rating" : 5},
                       {"item_id" : 7361, "rating" : 1}],
           "books" : [{"item_id" : 150259, "rating" : 4},
                      {"item_id" : 3230869, "rating" : 3}]}
ratings

# building user profile
def get_user_profile(tg, domain_ratings):
    df = pd.DataFrame()
    for rating in domain_ratings:
        weight = rating["rating"] - 2.5 # this is the weight of each rating
        item = tg[tg.item_id == rating["item_id"]].copy()
        item.score = item.score * weight # we multiply item vector by the weight based on the rating
        df = pd.concat([df, item]) # we add the item vector to the dataframe
    return df
profile = get_user_profile(tg_movies, ratings["movies"])
profile = pd.concat([profile, get_user_profile(tg_books, ratings["books"])])
len(profile)

# we build user vector by taking an average of the item vectors multiplied by the weights
profile = profile.groupby("tag").score.mean().reset_index()
profile[profile.tag.isin(common_tags)].sort_values("score").head(10)
# this is what the user is the least interested in

# this is what the user is the most interested in
profile[profile.tag.isin(common_tags)].sort_values("score").tail(10)

profile[profile.tag.isin(["romance", "time travel", "horror"])]

# ### Calculating movie recommendations

# calculating the dot product between the user vector and each of the movies
def get_dot_product(profile, tg_df):
    tg_domain_profile = pd.merge(tg_df, profile, on="tag", how="inner")
    tg_domain_profile["dot_product"] = tg_domain_profile.score_x * tg_domain_profile.score_y
    dot_product_df = tg_domain_profile.groupby("item_id").dot_product.sum().reset_index()
    return dot_product_df

movie_dot_product = get_dot_product(profile[profile.tag.isin(common_tags)], tg_movies) # we only consider common tags
movie_dot_product.head()

# calculating length of each movie vector
def get_item_length_df(tg_df):
    len_df = tg_df.copy()
    len_df["length"] = len_df.score * len_df.score
    len_df = len_df.groupby("item_id")["length"].sum().reset_index()
    len_df["length"] = len_df["length"]**(1/2)
    return len_df

movie_len_df = get_item_length_df(tg_movies[tg_movies.tag.isin(common_tags)])
movie_len_df.head()

# Calculating length of the user vector

# For our task, this step is unnecessary.
# We can skip length of the user vector in the cosine equation, because we compare cosine between the user vector and each movie.
# User vector remains the same and therefore its length does not affect the relative similarities of items.
# I included this value to make sure that the calculations are correct and that the similarity is between -1 and 1.
def get_vector_length(profile):
    prof_tmp = profile.copy()
    prof_tmp.score = prof_tmp.score * prof_tmp.score
    profile_vector_len = prof_tmp.score.sum()
    profile_vector_len = profile_vector_len**(1/2)
    return profile_vector_len

profile_vector_len = get_vector_length(profile[profile.tag.isin(common_tags)])
profile_vector_len

# calculating similarity for each movie
def get_sim_df(dot_product_df, len_df, profile_vector_len):
    sim_df = pd.merge(dot_product_df, len_df)
    sim_df["sim"] = sim_df["dot_product"] / sim_df["length"] / profile_vector_len
    return sim_df

movie_sim_df = get_sim_df(movie_dot_product, movie_len_df, profile_vector_len)
top10_movie_sim = movie_sim_df.sort_values("sim", ascending=False).head(10)
top10_movie_sim

# checking movie names
# by the way, you can also check movie pages by id
# for example: https://movielens.org/movies/5445
top10_recommended_movies = pd.merge(top10_movie_sim, movies, on="item_id")
top10_recommended_movies[["item_id", "sim", "title"]].sort_values("sim", ascending=False)

# ### Generating book recommendations
book_dot_product = get_dot_product(profile[profile.tag.isin(common_tags)], tg_books)
book_dot_product.head()

book_len_df = get_item_length_df(tg_books[tg_books.tag.isin(common_tags)])
book_len_df.head()

book_sim_df = get_sim_df(book_dot_product, book_len_df, profile_vector_len)
top10_book_sim = book_sim_df.sort_values("sim", ascending=False).head(10)
top10_book_sim

top10_recommended_books = pd.merge(top10_book_sim, books, on="item_id")
top10_recommended_books[["item_id", "sim", "title", "url"]].sort_values("sim", ascending=False)

# # Generating related recommendations
# Related recommendations are usually displayed on the movie/book page under the category similar movies/books

# ## Movies similar to the target movie
# Let's generate related recommendations for the movie "Minority report"

target_movie = tg_movies[tg_movies.item_id == 5445].copy()
target_movie = target_movie.drop(columns=["item_id"])
target_movie.sort_values("score", ascending=False).head(10)

# this is unnecessary
target_movie_len = get_vector_length(target_movie)
target_movie_len

# this time, we calculate dot product for all the tags, not only for the common ones
movie_to_movies_dot_product = get_dot_product(target_movie, tg_movies)
movie_to_movies_dot_product.head()

# we need to calculate vector lengths, because this time we include all the tags
full_movie_len_df = get_item_length_df(tg_movies)
full_movie_len_df.head()

related_movie_sim_df = get_sim_df(movie_to_movies_dot_product, full_movie_len_df, target_movie_len)
top10_movies_related_to_movie = related_movie_sim_df.sort_values("sim", ascending=False).head(10)
top10_movies_related_to_movie

top10_movies_related_to_movie = pd.merge(top10_movies_related_to_movie, movies, on="item_id")
top10_movies_related_to_movie[["item_id", "sim", "title"]].sort_values("sim", ascending=False)

# ## Books similar to the target movie
# In this calculation, we only use common tags

target_movie_limited_len = get_vector_length(target_movie[target_movie.tag.isin(common_tags)])
target_movie_limited_len

movie_to_books_dot_product = get_dot_product(target_movie[target_movie.tag.isin(common_tags)], tg_books)
movie_to_books_dot_product.head()

related_books_sim_df = get_sim_df(movie_to_books_dot_product, book_len_df, target_movie_limited_len)
top10_books_related_to_movie = related_books_sim_df.sort_values("sim", ascending=False).head(10)
top10_books_related_to_movie

top10_books_related_to_movie = pd.merge(top10_books_related_to_movie, books, on="item_id")
top10_books_related_to_movie[["item_id", "sim", "title", "url"]].sort_values("sim", ascending=False)

# ## Books similar to the target book
# For this example, let's pick the book "It" by Stephen King

target_book = tg_books[tg_books.item_id == 150259].copy()
target_book = target_book.drop(columns=["item_id"])
target_book.sort_values("score", ascending=False).head(10)

target_book_len = get_vector_length(target_book)
target_book_len

book_to_books_dot_product = get_dot_product(target_book, tg_books)
book_to_books_dot_product.head()

full_book_len_df = get_item_length_df(tg_books)
full_book_len_df.head()

related_book_sim_df = get_sim_df(book_to_books_dot_product, full_book_len_df, target_book_len)
top10_books_related_to_book = related_book_sim_df.sort_values("sim", ascending=False).head(10)
top10_books_related_to_book

top10_books_related_to_book = pd.merge(top10_books_related_to_book, books, on="item_id")
top10_books_related_to_book[["item_id", "sim", "title", "url"]].sort_values("sim", ascending=False)

# ## Movies similar to the target book
target_book_limited_len = get_vector_length(target_book[target_book.tag.isin(common_tags)])
target_book_limited_len

book_to_movies_dot_product = get_dot_product(target_book[target_book.tag.isin(common_tags)], tg_movies)
book_to_movies_dot_product.head()

related_movies_sim_df = get_sim_df(book_to_movies_dot_product, movie_len_df, target_book_limited_len)
top10_movies_related_to_book = related_movies_sim_df.sort_values("sim", ascending=False).head(10)
top10_movies_related_to_book

top10_movies_related_to_book = pd.merge(top10_movies_related_to_book, movies, on="item_id")
top10_movies_related_to_book[["item_id", "sim", "title"]].sort_values("sim", ascending=False)

# testing print function
print (top10_movies_related_to_movie)

