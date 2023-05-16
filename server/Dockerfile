FROM rust:1.69-alpine

WORKDIR /usr/src/felix-server
COPY . .

RUN cargo install --path .

EXPOSE 6969

CMD ["felix-server"]
