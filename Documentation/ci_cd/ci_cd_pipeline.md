# Current CI/CD pipeline

## With every push, the main.yml will:

- Sign in to Dockerhub via secret credentials set up in repository

- Build a new docker image from frontend folder

- Push the new image to Dockerhub

In cPouta:

- [Watchtower](https://containrrr.dev/watchtower/) will check every minute if a new image is pushed to Dockerhub

- Watchtower will pull new image, start it with the same settings as the last one and remove the old image

Watchtower runs in cPouta with this command:
```
sudo docker run -d --name watchtower6 -e WATCHTOWER_POLL_INTERVAL=60 -e WATCHTOWER_DEBUG=TRUE -e WATCHTOWER_CLEANUP=TRUE -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower
```
## To deploy new image to production

Just merge a new feature to main branch and actions will take care of rest.

If CD pipeline somehow brakes, you can do this manually with these instructions:

!DISCLAIMER! Following these steps WILL stop the production version of the app to close down for a moment. If a new image is somehow corrupted, run the old image to keep the app functioning.

### With the script:
1. Connect to the cPouta virtual machine via ssh. [instructions here](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/Documentation/instructions/cpouta.md)

2. run 
    ```
        bash publish.sh
    ```
3. (optional) Remove the old image with:
    ```
        sudo docker image rm -f {IMAGE ID}
    ```
    Don't do this until you are sure that new image works flawlessy.
 
 Contents of the script:
 ```
 
 #!/bin/sh

sudo docker pull evahteri/movie-book-recommender:latest

sudo docker container kill movie-book

sudo docker container rm movie-book

sudo docker run -d --name movie-book -p 5000:5000 evahteri/movie-book-recommender:latest
```

### Manually:

1. Connect to the cPouta virtual machine via ssh. [instructions here](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/Documentation/instructions/cpouta.md)

2. Pull new image from dockerhub by running:
    ```
        sudo docker pull evahteri/movie-book-recommender:latest
    ```
3. Kill the earlier container from running:

- Check the running containers with:
    ```
        sudo docker container ls
    ```
    and check the container id for the next step

- Shut down the container with:
    ```
        sudo docker container kill {CONTAINER ID}
    ```

4. Start the updated image:

- Check downloaded images with:
    ```
        sudo docker image ls
    ```
- Start the new image with:
    ```
        sudo docker run -d --name movie-book -p 5000:5000 evahteri/movie-book-recommender:latest
    ```

5. (optional) Remove the old image with:
    ```
        sudo docker image rm -f {IMAGE ID}
    ```
    Don't do this until you are sure that new image works flawlessy.

### Something wrong with the new image? Go back to the old one

Kill the running container first with step 3 of earlier instruction.

1. Check downloaded images with:
    ```
        sudo docker image ls
    ```
2. Check the IMAGE ID of the earlier image, you can see the creation times in column CREATED

3. Start the old image with:
    ```
        sudo docker run -d -p 5000:5000 {IMAGE ID}
    ```
