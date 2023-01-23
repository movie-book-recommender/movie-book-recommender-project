CREATE TABLE IF NOT EXISTS mv_survey_answers (
	user_id INT,
	item_id INT,
	tag_id INT,
	score INT
);
CREATE TABLE IF NOT EXISTS mv_metadata (
	title VARCHAR(2000),
	directedBy VARCHAR(2000),
	starring VARCHAR(2000),
	dateAdded DATE,
	avgRating NUMERIC, 
	imdbId VARCHAR(20),
	item_id INT
);
CREATE TABLE IF NOT EXISTS mv_metadata_updated (
	title VARCHAR(2000),
	directedBy VARCHAR(2000),
	starring VARCHAR(2000),
	avgRating NUMERIC, 
	imdbId VARCHAR(20),
	item_id INT
);
CREATE TABLE IF NOT EXISTS mv_ratings (
	item_id INT,
	user_id INT,
	rating NUMERIC
);
CREATE TABLE IF NOT EXISTS mv_reviews (
	item_id INT,
	txt VARCHAR(65535)
);
CREATE TABLE IF NOT EXISTS mv_tag_count (
	item_id INT,
	tag_id INT,
	num INT
);
CREATE TABLE IF NOT EXISTS mv_tags (
   tag VARCHAR(255),
   id INT
);

CREATE TABLE IF NOT EXISTS bk_metadata (
	item_id INT,
	url VARCHAR(1000),
	title VARCHAR(255),
	authors VARCHAR(255),
	lang VARCHAR(255),
	img VARCHAR(1000),
	year INT,
	description VARCHAR(65535)
);
CREATE TABLE IF NOT EXISTS bk_ratings (
   item_id INT,
   user_id INT,
   rating NUMERIC
);
CREATE TABLE IF NOT EXISTS bk_reviews (
   item_id INT,
   txt VARCHAR(65535)
);
CREATE TABLE IF NOT EXISTS bk_survey_answers (
   user_id INT,
   item_id INT,
   tag_id INT,
   score NUMERIC
);
CREATE TABLE IF NOT EXISTS bk_tag_count (
   item_id INT,
   tag_id INT,
   num INT
);
CREATE TABLE IF NOT EXISTS bk_tags (
   tag VARCHAR(255),
   id INT
);

CREATE TABLE IF NOT EXISTS movie_tmdb_data_full (
	movieId INT,
	tmdbMovieId INT,
	title VARCHAR(251),
	originalTitle VARCHAR(252),
	collection VARCHAR(253),
	genres VARCHAR(2001),
	actors VARCHAR(65535),
	directors VARCHAR(2002),
	posterPath VARCHAR(254),
	youtubeTrailerIds VARCHAR(1000),
	plotSummary VARCHAR(65535),
	tagline VARCHAR(2003),
	releaseDate DATE,
	originalLanguage VARCHAR(100),
	languages VARCHAR(256),
	mpaa VARCHAR(100),
	runtime INT,
	budget BIGINT,
	revenue BIGINT,
	lastUpdated TIMESTAMP,
	backdropPaths VARCHAR(10000)
);
