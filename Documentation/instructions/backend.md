# Backend: Instructions

This document describes setting up and using the backend for Movie-book recommender. It would be possible to deploy front end code here as well. 

## Set-up virtual machine in cPouta

To create a virtual machine in cPouta, instructions from [CSC](https://docs.csc.fi/cloud/pouta/launch-vm-from-web-gui/#preparatory-steps) were followed. Some highlights: 
1. **CSC project.**
    The correct CSC project was selected from [MyCSC](https://my.csc.fi/) (CSC userID and password are needed to access the project information).
2. **SSH keys.** 
    SSH keys were set up for the project. Public key was generated in cPouta. Private key was extracted and stored with the help of [puttygen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html).
3. **Firewalls and security groups.** 
    The movie book recommender uses three cPouta security groups: default and ssh (available by default in cPouta) as well as postgres (new one created to open a port to access the database). Details on the security groups are available for project members through [cPouta](https://pouta.csc.fi/).
4. **Launching a virtual machine.** 
    In cPouta, an instance called moviebook_test was launched. Ubuntu-22.04 was selected as the image (provided by cPouta) and standard.large was selected as the flavor.
5. **IP address.** 
    An IP address was created for the virtual machine. It is **128.214.253.51**.

## Connect to the virtual machine

To connect to the virtual machine, instructions from [CSC](https://docs.csc.fi/cloud/pouta/connecting-to-vm/) were followed. Some highlights:
1. **Keypair-based SSH connection via Putty**
    Connection to the virtual machine is based on SSH. Connection was created with the help of Putty. It is important to note that unlike stated in the CSC instructions, the connect to the virtual machine needs to to use the following user name: **ubuntu**.

    This opens connection to the virtual machine command line.

2. **Other methods to connect to the virtual machine**
    [WinSCP](https://winscp.net/) can be used to easily transfer files between local and remote machines. It uses connections set up in Putty.

3. **Upgrading and updating the virtual machine**
    Before using the virtual machine, the operating system was updated and upgraded. Updates require restarting the system.

    ```
    sudo apt update
    sudo apt upgrade
    sudo shutdown -r now
    ```

## Install, set-up and get access to a new Postgres database

* Portgres database was **installed** with the following command: 
    ```
    sudo apt install postgresql postgresql-contrib
    ```

* To get the database operational, the following **configuration files** were edited: 
    * /etc/postgresql/14/main/pg_hba.conf
    * /etc/postgresql/14/main/postgresql.conf

* Thereafter, the database was **restarted**
    ```
    sudo service postgresql restart
    ```

* Super user for the database is *postgres* by default. As the superuser, a **database** called *mvbkdb* and **user** *moviebook* (can create and populate tables as well as make queries) were **created**. 
    ```
    CREATE DATABASE mvbkdb;
    CREATE USER moviebook CREATEDB LOGIN PASSWORD password;
    ```

* Superuser can, if needed, **change the password** for *moviebook* with the following command.
    ```
    ALTER USER moviebook WITH ENCRYPTED PASSWORD newpassword;
    ```

* To access the database as *moviebook* the following command is used. Thereafter the *moviebook's* password needs to be input.
    ```
    psql -d mvbkdb -U moviebook
    ```

* The following actions were taken as user *moviebook*. Database *mvbkdb* can now be accessed from the virtual machine's Ubuntu command line. 

## Create tables in the database

* **Tables** for the database were created with the script [create_db.sql](create_db.sql). 

* It was run with the following command:
    ```
    psql -U moviebook -d mvbkdb -a -f create_db.sql
    ```

## Download and parse data

* Data was **downloaded** straight to the virtual machine.
    ```
    wget https://files.grouplens.org/datasets/tag-genome-2021/genome_2021.zip
    wget https://files.grouplens.org/datasets/book-genome/book-genome.zip
    ```

* To **unzip** a new program was installed... 
    ```
    sudo apt install unzip

    ```
* ... and the files were unzipped with the following commands
    ```
    unzip book-genome.zip
    unzip genome_2021.zip
    ```

## Populate the database with data

* Due to the large size of the files, population of the database was done using program called `jq`
    ```
    sudo apt install jq
    ```

* jq is able to read json files and **convert** them to csv files with a command like the following
    ```
    cat ./movie_dataset_public_final/raw/tags.json | jq -r '. | join("|")' > tags.csv
    ```

* The resulting csv file can be imported into the database. For example:
    ```
    psql -U moviebook -d mvbkdb -c "\copy mv_tags FROM 'tags.csv' delimiter '|' csv"
    ```

* The script used to populate the database is available in [csc_json_to_csv_to_psql.sh](csc_json_to_csv_to_psql.sh)
* Please note that to make a script executable on Linux, the following command is needed `chmod +x filename.sh`.

* Work is yet to be done to add all of the files into the database.

## Write backend API to serve data from database

* The **API** was written using python, Flask, and SQLAlchemy. The following commands were used to install the needed packages:
    ```
    sudo apt install python3-pip
    sudo apt-get install libpq-dev
    sudo apt install python3-flask
    pip install sqlalchemy
    pip install psycopg2
    pip install flask_sqlalchemy
    ```

* Code for backend the API is available in [app.py](app.py).

* To establish connection with the database, the following command was run in the command line:
    ```
    export DATABASE_URL="postgresql://user:password@localhost:5432/mvbkdb"
    ```

* Backend API is run from command line with the following command:
    ```
    flask run --host=0.0.0.0 --port=3000
    ```

## Examples of API endpoints available

* Output from the backend API is availabe via the address [http://128.214.253.51:3000/](http://128.214.253.51:3000/).

* Data can be accessed by using the routes created. Currently, for example the following data is available for use in the front end:

1. All information available for **one movie** 
    * Data is provided via the route `@app.route('/dbgetonemoviedata', methods = ['GET'])`
    * You will need to specify the movie based on the movieid in the tmbd_movie_data_full table, for example movie *Heat* has movieid 6.
    * Results are available in JSON form from address [http://128.214.253.51:3000/dbgetgivenmoviedata?movieid=6](http://128.214.253.51:3000/dbgetgivenmoviedata?movieid=6).
    * Output looks as follows (note: this page is only done for debugging and illustrative purposes. In reality, front end should just use the routes and addresses stated above)
    ![Heat](one_movie.jpg)

2. All information available for **top 10 movies by budget for a given year**
    * Data is provided via the route `@app.route('/dbgettop10moviesbyyear', methods = ['GET']`
    * You will need to specify the release year of the movie.
    * Results are available in JSON form from address [http://128.214.253.51:3000/dbgettop10moviesbyyear?year=2022](http://128.214.253.51:3000/dbgettop10moviesbyyear?year=2022).

* The JSON output provides fields such as *posterpath* and *backdroppaths*. These are actually just the file names, but can be joined together with the string https://image.tmdb.org/t/p/original in order to build the full url. For example, https://image.tmdb.org/t/p/original/obpPQskaVpSiC9RcJRB6iWDTCXS.jpg

## Running the backend

* Currently the application is set to run on the cPouta server with the following command
    ```
    flask run --host=0.0.0.0 --port=3000 > log.txt 2>&1 &
    ```

* Please note that this method of running an API is incorrect and is done only for development and testing purposes.

