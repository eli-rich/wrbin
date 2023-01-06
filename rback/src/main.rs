use actix_files as fs;
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder, Result};
use serde::Serialize;

#[get("/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello, World!")
}

#[derive(Serialize)]
struct UID {
    id: String,
}

#[get("/api/me")]
async fn me() -> Result<impl Responder> {
    let no_id = UID { id: "".to_string() };
    Ok(web::Json(no_id))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(me)
            .service(fs::Files::new("/", "../front/dist").index_file("index.html"))
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}
