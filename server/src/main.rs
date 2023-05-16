use axum::extract::Query;
use axum::response::{Html, IntoResponse};
use axum::routing::{get, get_service};
use axum::Extension;
use axum::{Json, Router, Server};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::net::SocketAddr;
use tower_http::trace;

#[tokio::main]
async fn main() {
    let subscriber = tracing_subscriber::FmtSubscriber::builder()
        .with_max_level(tracing::Level::DEBUG)
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("setting tracing subscriber failed");

    dotenvy::dotenv().unwrap();

    for (key, value) in std::env::vars() {
        println!("{key}: {value}");
    }

    let db_url = std::env::var("DATABASE_URL").unwrap();
    let pool = felix_server::db::create_pool(db_url)
        .await
        .expect("can't connect to db");
    sqlx::migrate!().run(&pool).await.unwrap();

    let users_router = felix_server::routes::users::create_router();
    let services_router = felix_server::routes::services::create_router();

    let router = Router::new()
        .route("/", get(|| async { Html("<h1>Home</h1>".to_string()) }))
        .route("/ping", get(|| async { Json(json!({ "message": "pong"})) }))
        .nest("/api/users", users_router)
        .nest("/api/services", services_router)
        .merge(create_static_router())
        .layer(
            trace::TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().include_headers(true))
                .on_request(trace::DefaultOnRequest::new().level(tracing::Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(tracing::Level::INFO)),
        )
        .layer(Extension(pool));

    let addr: SocketAddr = "127.0.0.1:6969".parse().unwrap();
    tracing::info!("listening on {}", addr);

    Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

fn create_static_router() -> Router {
    Router::new().nest_service(
        "/public",
        get_service(tower_http::services::ServeDir::new("public")),
    )
}