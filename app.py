from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Required for session handling

# Predefined user credentials (For demonstration purposes)
USER_CREDENTIALS = {
    "admin": "password123",
    "user": "mypassword"
}

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        if username in USER_CREDENTIALS and USER_CREDENTIALS[username] == password:
            session["user"] = username  # Store user session
            return redirect(url_for("dashboard"))  # Redirect to dashboard
        else:
            return render_template("login.html", error="Invalid credentials. Try again.")

    return render_template("login.html", error=None)


@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))  # Redirect to login if not authenticated
    return render_template("dashboard.html", username=session["user"])


@app.route("/logout")
def logout():
    session.pop("user", None)  # Remove user from session
    return redirect(url_for("login"))  # Redirect back to login page


if __name__ == "__main__":
    app.run(debug=True)
