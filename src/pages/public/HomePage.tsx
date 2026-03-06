import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">

          <Link className="navbar-brand fw-bold fs-4" to="/">
            🎓 College SMS
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

              <Link
                to="/sign-in"
                className="btn btn-light fw-semibold px-4"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>

              <Link
                to="/sign-up"
                className="btn btn-outline-light fw-semibold px-4"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>

            </div>
          </div>

        </div>
      </nav>

      <section className="bg-light text-center py-5 flex-grow-1 d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold text-primary">
            Student Management System
          </h1>

          <p className="lead text-muted mt-3 px-lg-5">
            Manage students, courses, attendance, and academic performance
            efficiently in one centralized platform.
          </p>

          <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">
            <Link to="/sign-up" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>

            <Link to="/sign-in" className="btn btn-outline-primary btn-lg px-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 text-center">

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h4 className="card-title text-primary fw-semibold">
                    📋 Student Records
                  </h4>
                  <p className="card-text text-muted mt-3">
                    Add, update, delete and manage student information with ease.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h4 className="card-title text-success fw-semibold">
                    📊 Attendance Tracking
                  </h4>
                  <p className="card-text text-muted mt-3">
                    Track attendance records and generate real-time reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mx-auto">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h4 className="card-title text-danger fw-semibold">
                    📝 Performance Reports
                  </h4>
                  <p className="card-text text-muted mt-3">
                    Monitor academic performance and analyze student progress.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Start Managing Students Today!</h2>
          <p className="mt-3 fs-5">
            Simple. Secure. Efficient.
          </p>

          <Link
            to="/sign-up"
            className="btn btn-light btn-lg mt-3 px-5 fw-semibold"
          >
            Create Account
          </Link>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0 small">
            © 2026 College Student Management System
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;