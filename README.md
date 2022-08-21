# python-flask-docker
Basic Python Flask app in Docker which prints the hostname and IP of the container

### Build application
Build the Docker image manually by cloning the Git repo.
```
$ git clone https://github.com/lvthillo/python-flask-docker.git
$ docker build -t lvthillo/python-flask-docker .
```

### Download precreated image
You can also just download the existing image from [DockerHub](https://hub.docker.com/r/lvthillo/python-flask-docker/).
```
docker pull lvthillo/python-flask-docker
```

### Run the container
Create a container from the image.
```
$ docker run --name my-container -d -p 8080:8080 lvthillo/python-flask-docker
```

Now visit http://localhost:8080
```
 The hostname of the container is 6095273a4e9b and its IP is 172.17.0.2. 
```

### Verify the running container
Verify by checking the container ip and hostname (ID):
```
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container
172.17.0.2
$ docker inspect -f '{{ .Config.Hostname }}' my-container
6095273a4e9b
```



server {
    listen 80;
    server_name 34.143.248.73;

     location / {
        include proxy_params;
        proxy_pass http://34.143.248.73:8080;
    }
}

sudo ln -s /etc/nginx/sites-available/dev-test.online /etc/nginx/sites-enabled/dev-test.online
sudo ln -s /etc/nginx/sites-available/elasticsearch.dev-test.online /etc/nginx/sites-enabled/elasticsearch.dev-test.online
sudo ln -s /etc/nginx/sites-available/kibana.dev-test.online /etc/nginx/sites-enabled/kibana.dev-test.online


sudo nginx -t

sudo systemctl restart nginx

server {
        listen      80;
        server_name python-flask.dev-test.online;
        location / {
            include proxy_params;
            proxy_pass http://34.143.248.73:8080;
        }
}

server {
        listen      80;
        server_name kibana.dev-test.online;
        location / {
            include proxy_params;
            proxy_pass http://34.143.248.73:5601;
        }
}

server {
    listen       80;
    server_name elasticsearch.dev-test.online;
    location / {
        include proxy_params;
        proxy_pass http://34.143.248.73:9200;
    }
}

gcloud compute ssh python-flask --zone=asia-southeast1-a

version: "3.0"
services:
  elasticsearch:
    container_name: es-container
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.0
    environment:
      discovery.type: 'single-node'
      xpack.security.enabled: 'false'
      xpack.security.enabled: 'false'
      xpack.monitoring.enabled: 'false'
      xpack.watcher.enabled: 'false'
      xpack.ml.enabled: 'false'
      http.cors.enabled : 'true'
      http.cors.allow-origin : "*"
      http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
      http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
      logger.level: debug
    networks:
      - es-net
    ports:
      - 9200:9200
  kibana:
    container_name: kb-container
    image: docker.elastic.co/kibana/kibana:7.11.0
    environment:
      - ELASTICSEARCH_HOSTS=http://es-container:9200
    networks:
      - es-net
    depends_on:
      - elasticsearch
    ports:
      - 5601:5601
networks:
  es-net:
    driver: bridge



http.cors.allow-origin: "*"
http.cors.allow-methods: Origin, X-Requested-With, Content-Type, Content-length, Accept
http.cors.enabled: true


server.publicBaseUrl missing

References
Multiple servers nginx
https://www.digitalocean.com/community/questions/multiple-domains-on-different-ports-of-the-same-droplet

Elasticsearch/Kibana
https://levelup.gitconnected.com/docker-compose-made-easy-with-elasticsearch-and-kibana-4cb4110a80dd

Symbolic Link
https://www.techrepublic.com/article/linux-101-how-to-create-symbolic-links-in-linux/

Setup nginx server block
sudo ln -s /etc/nginx/sites-available/dev-test.online /etc/nginx/sites-enabled/

Install gcloud
https://stackoverflow.com/questions/31037279/gcloud-command-not-found-while-installing-google-cloud-sdk

How To Serve Flask Applications with Gunicorn and Nginx on Ubuntu 16.04
https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-16-04

How To Install Nginx on Ubuntu 16.04
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

Fixed got permission denied on docker run
https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue

Elasticsearch Defining Index
https://kb.objectrocket.com/elasticsearch/how-to-map-an-elasticsearch-index-using-the-python-client-266

https://elasticsearch-py.readthedocs.io/en/v8.1.1/api.html#indices
https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-indices.html

Elasticsearch Fuzzy Search
https://hackernoon.com/how-to-use-fuzzy-query-matches-in-elasticsearch-dh1h3167

Elasticsearch with AsyncIO
https://elasticsearch-py.readthedocs.io/en/v8.1.1/async.html

Intuitive Elasitcsearch
https://medium.com/@neelambuj2/an-approach-to-highly-intuitive-fuzzy-search-in-elasticsearch-with-typo-handling-exact-matches-a79a795d36f8


GET clothing/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "multi_match": {
                        "query": "J3an",
                        "type": "phrase",
                        "fields": [
                            "doc.name"
                        ],
                        "boost": 10
                    }
                },
                {
                    "multi_match": {
                        "query": "Jean",
                        "type": "most_fields",
                        "fields": [
                            "doc.name"
                        ],
                        "fuzziness": "AUTO"
                    }
                }
            ]
        }
    }
}


docker build -t foo .
docker run --rm -ti -p 5000:5000 --name flask1 foo

docker-compose up --build --scale app=1 --remove-orphans 
docker-compose up -d --build --scale app=3