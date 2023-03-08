
import pandas as pd
tg_movies = pd.read_csv("/home/evahteri/Koulu/OHTUPROJEKTI/se_project/tagdl_movies.csv")
tg_books = pd.read_csv("/home/evahteri/Koulu/OHTUPROJEKTI/se_project/tagdl_books.csv")


book_tags = set(tg_books.tag.unique())
movie_tags = set(tg_movies.tag.unique())
common_tags = book_tags.intersection(movie_tags)
book_ids = set(tg_books.item_id.unique())
movie_ids = set(tg_movies.item_id.unique())
print(len(book_ids))
print(len(movie_ids))

def get_vector_length(target_item):
    item_tmp = target_item.copy()
    item_tmp.score = item_tmp.score * item_tmp.score
    item_vector_len = item_tmp.score.sum()
    item_vector_len = item_vector_len**(1/2)
    #print("item vector len:")
    #print(item_vector_len)
    return item_vector_len

def get_dot_product(target_item, tg_df):
    #print(tg_df.columns.tolist())
    tg_domain_target_item = pd.merge(tg_df, target_item, on='tag', how='inner')
    #print(tg_domain_target_item)
    tg_domain_target_item['dot_product'] = tg_domain_target_item.score_x * tg_domain_target_item.score_y
    #print("target item dot product:")
    #print(tg_domain_target_item['dot_product'])
    dot_product_df = tg_domain_target_item.groupby('item_id_x').dot_product.sum().reset_index()
    # Item_id_y is the searched movie and item_id_x is the id  for the reference movie
    # Score_x is item_id_x's score and score_y is the searched movie's score
    # Output is like this:
    # this is the dot product between target item vs all other items:

    #   item_id_x  dot_product

        #0          1    74.601821
        #1          2    56.922107
        #2          3    36.756497
        #3          4    31.198870
        #4          5    34.929650
        #5          6    78.533319
        #6          7    35.512344
        #7          8    30.338471
        #8          9    33.557188
        #9         10    60.956520
    return dot_product_df

def get_item_length_df(tg_df):
    len_df = tg_df.copy()
    len_df["length"] = len_df.score * len_df.score
    len_df = len_df.groupby("item_id")["length"].sum().reset_index()
    len_df["length"] = len_df["length"]**(1/2)
    #print("len_df:")
    #print(len_df)
    #len_df.to_csv("item_lengths.csv", index=False)
    return len_df

def get_sim_df(dot_product_df, len_df, profile_vector_len):
    #print("dot")
    #print(dot_product_df)
    #print(len_df)
    sim_df = pd.merge(dot_product_df, len_df, left_on="item_id_x", right_on="item_id")
    sim_df["sim"] = sim_df["dot_product"] / sim_df["length"] / profile_vector_len
    #print("sim_df:")
    #print(sim_df)
    return sim_df

full_dataframe = pd.DataFrame(columns=["i", "item_id", "item_type", "sim"])

#movie_ids = [5445]

for i in movie_ids:
    print(i)
    #if i == 21856269:
        #break
    target_movie = tg_movies[tg_movies.item_id == i].copy()

#target_book = tg_books[tg_books.item_id == 5445].copy()
# Here goes the for loop for every movie

    target_movie_limited_len = get_vector_length(target_movie[target_movie.tag.isin(common_tags)])
    #print(target_book_len)
    #print(tg_books.columns.tolist())
    #print("target movei limited len:")
    #print(target_movie_limited_len)
    movie_to_books_dot_product = get_dot_product(target_movie[target_movie.tag.isin(common_tags)], tg_books)

    #print(movie_to_books_dot_product.head(10))

    book_len_df = get_item_length_df(tg_books[tg_books.tag.isin(common_tags)])

    #print("book len df:")
    #print(book_len_df)

    related_books_sim_df = get_sim_df(movie_to_books_dot_product, book_len_df, target_movie_limited_len)

    #print(related_books_sim_df)

    top10_books_related_to_movie = related_books_sim_df.sort_values("sim", ascending=False).head(10)

    #print(top10_books_related_to_movie)


    result = related_books_sim_df.sort_values("sim", ascending=False, ignore_index=True).head(10).drop(columns=["dot_product", "length", "item_id_x"])
    result["i"] = i
    result["item_type"] = "book"
    #print(result)
    full_dataframe = full_dataframe.append(result)
    full_dataframe.to_csv("mv_to_bks_sim.csv", index=False)

#print(full_dataframe.reset_index(drop=True))
#full_dataframe.to_csv("bk_sim.csv", index=False)