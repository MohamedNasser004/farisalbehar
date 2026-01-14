import Footer from "./Footer";
import Header from "./Header";

export const revalidate = 0;

async function getArticles() {
  const ApiUrl = "http://localhost:7000/api/article/all";

  const res = await fetch(ApiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store" // مهم لعدم التخزين
  });

  return res.json();
}

export default async function Articles() {
  const articles = await getArticles();

  return (
    <>
    
    <div className="container mt-5">
      <h1 className="mb-5 text-center fw-bold">قائمة المقالات</h1>
      
      <div className="row g-4">
        {articles.map((blog, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm border-0">

              {/* الصورة */}
              <img
                src={`http://localhost:7000${blog.photo}`}
                className="card-img-top"
                alt={blog.title}
                style={{ height: "220px", objectFit: "cover" }}
              />

              {/* جسم الكارد */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">
                  <a 
                    href={`/${blog.slug}/`} 
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {blog.title}
                  </a>
                </h5>

                <p className="card-text text-muted flex-grow-1">
                  {blog.metadescription}
                </p>

                {/* زر القراءة */}
                <div className="mt-3">
                  <a 
                    href={`/${blog.slug}/`} 
                    className="btn btn-primary w-100 fw-bold"
                  >
                    قراءة المزيد
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}