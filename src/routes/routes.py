from flask import Flask, jsonify, request
from repository.movie_repository import movie_repository, tag_repository
from db import db

@app.route('/')
def index():
    return 'Index page'

@app.route('/hello')
def hello():
    return 'Hello, World'

@app.route('/dbgettags', methods = ['GET'])
def gettablevalues():
    allvalues = tag_repository.query.all()
    allvalues_dict = tag_repository.dict_helper(allvalues)
    return jsonify(allvalues_dict)


@app.route('/dbgetonemoviedata', methods = ['GET'])
def get_one_movie_data():
    allvalues = movie_repository.query.first()
    return jsonify(allvalues.object_to_dictionary())

@app.route('/dbgetgivenmoviedata_test', methods = ['GET'])
def get_given_movie_data_test():
    allvalues = movie_repository.query.filter_by(movie_tmdb_data_full_movieid = 6).first()
    return jsonify(allvalues.object_to_dictionary())

@app.route('/dbgetgivenmoviedata', methods = ['GET'])
def get_given_movie_data():
    movieid = int(request.args['movieid'])
    allvalues = movie_repository.query.filter_by(movie_tmdb_data_full_movieid = movieid).first()
    return jsonify(allvalues.object_to_dictionary())

@app.route('/dbgettop10moviesbyyear', methods = ['GET'])
def get_top_10_movies_by_year():
    year_value = int(request.args['year'])
    allvalues = movie_repository.query.filter(db.extract('year', 
                        movie_repository.movie_tmdb_data_full_releasedate) == year_value).order_by(movie_repository.movie_tmdb_data_full_revenue.desc()).limit(10).all()
    allvalues_dict = tag_repository.dict_helper(allvalues)
    return jsonify(allvalues_dict)