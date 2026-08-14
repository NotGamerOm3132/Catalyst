const authCard = document.getElementById("auth-card");

const signInTemplate = `
    <div class="auth-header">
        <span class="auth-eyebrow">
            Welcome back
        </span>

        <h2>
            Sign in to Catalyst.
        </h2>

        <p>
            Continue your journey and pick up where you left off.
        </p>
    </div>

    <div class="auth-switch">
        <button
            type="button"
            class="auth-switch-btn active"
            data-auth-mode="signin"
        >
            Sign In
        </button>

        <button
            type="button"
            class="auth-switch-btn"
            data-auth-mode="signup"
        >
            Create Account
        </button>
    </div>

    <div class="auth-message" id="auth-message"></div>

    <form class="auth-form" id="signin-form">

        <div class="form-group">
            <label for="signin-email">
                Email
            </label>

            <input
                type="email"
                id="signin-email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
            >
        </div>

        <div class="form-group">
            <label for="signin-password">
                Password
            </label>

            <input
                type="password"
                id="signin-password"
                name="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
            >
        </div>

        <div class="auth-form-options">

            <label class="remember-me">
                <input
                    type="checkbox"
                    name="remember"
                >

                <span>
                    Remember me
                </span>
            </label>

            <a href="#" class="forgot-password">
                Forgot password?
            </a>

        </div>

        <button
            type="submit"
            class="btn btn-primary auth-submit"
        >
            Sign In
        </button>

    </form>

    <div class="auth-divider">
        <span>or continue with</span>
    </div>

    <button
        type="button"
        class="auth-google"
    >
        <span class="google-icon">
            G
        </span>

        Continue with Google
    </button>

    <p class="auth-bottom-text">
        Don't have an account?

        <button
            type="button"
            class="auth-inline-switch"
            data-auth-mode="signup"
        >
            Create one
        </button>
    </p>
`;

const signUpTemplate = `
    <div class="auth-header">
        <span class="auth-eyebrow">
            Start your journey
        </span>

        <h2>
            Create your Catalyst account.
        </h2>

        <p>
            Build better habits, study smarter, and grow every day.
        </p>
    </div>

    <div class="auth-switch">

        <button
            type="button"
            class="auth-switch-btn"
            data-auth-mode="signin"
        >
            Sign In
        </button>

        <button
            type="button"
            class="auth-switch-btn active"
            data-auth-mode="signup"
        >
            Create Account
        </button>

    </div>

    <div class="auth-message" id="auth-message"></div>

    <form class="auth-form" id="signup-form">

        <div class="form-group">
            <label for="signup-name">
                Full Name
            </label>

            <input
                type="text"
                id="signup-name"
                name="name"
                placeholder="Your name"
                autocomplete="name"
                required
            >
        </div>

        <div class="form-group">
            <label for="signup-email">
                Email
            </label>

            <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
            >
        </div>

        <div class="form-group">
            <label for="signup-password">
                Password
            </label>

            <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Create a password"
                autocomplete="new-password"
                required
            >

            <div class="password-strength">
                <div class="password-strength-header">
                    <span>Password strength</span>
                    <span class="password-strength-label"></span>
                </div>

                <div class="password-strength-bar">
                    <span class="password-strength-fill"></span>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="signup-confirm-password">
                Confirm Password
            </label>

            <input
                type="password"
                id="signup-confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                required
            >
        </div>

        <label class="auth-terms">

            <input
                type="checkbox"
                name="terms"
                required
            >

            <span>
                I agree to the
                <a href="#">
                    Terms
                </a>
                and
                <a href="#">
                    Privacy Policy
                </a>
            </span>

        </label>

        <button
            type="submit"
            class="btn btn-primary auth-submit"
        >
            Create Account
        </button>

    </form>

    <div class="auth-divider">
        <span>or continue with</span>
    </div>

    <button
        type="button"
        class="auth-google"
    >
        <span class="google-icon">
            G
        </span>

        Continue with Google
    </button>

    <p class="auth-bottom-text">
        Already have an account?

        <button
            type="button"
            class="auth-inline-switch"
            data-auth-mode="signin"
        >
            Sign in
        </button>
    </p>
`;

function getStoredUser() {
    const storedUser = localStorage.getItem("catalystUser");

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem("catalystUser");
        return null;
    }
}

function showMessage(message, type = "error") {
    const messageBox = document.getElementById("auth-message");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;
    messageBox.className = `auth-message ${type}`;
}

function clearMessage() {
    const messageBox = document.getElementById("auth-message");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";
    messageBox.className = "auth-message";
}

function bindAuthEvents() {
    const modeButtons = document.querySelectorAll("[data-auth-mode]");

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            switchAuth(button.dataset.authMode);
        });
    });

    const form = document.querySelector(".auth-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (form.id === "signup-form") {
                handleSignUp(form);
            } else {
                handleSignIn(form);
            }
        });
    }

    const passwordInput = document.getElementById("signup-password");
    const passwordStrength = document.querySelector(".password-strength");

    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener("input", () => {
            if (passwordInput.value.length > 0) {
                passwordStrength.classList.add("visible");
                updatePasswordStrength(passwordInput.value);
            } else {
                passwordStrength.classList.remove("visible");
            }
        });
    }
}

function switchAuth(mode) {
    clearMessage();

    const isSignUp = mode === "signup";

    authCard.classList.remove(
        "auth-switch-in",
        "auth-switch-out"
    );

    authCard.classList.add("auth-switch-out");

    setTimeout(() => {
        authCard.innerHTML = isSignUp
            ? signUpTemplate
            : signInTemplate;

        bindAuthEvents();

        authCard.classList.remove("auth-switch-out");

        void authCard.offsetWidth;

        authCard.classList.add("auth-switch-in");

        setTimeout(() => {
            authCard.classList.remove("auth-switch-in");
        }, 350);
    }, 180);
}

function updatePasswordStrength(password) {
    const label = document.querySelector(".password-strength-label");
    const fill = document.querySelector(".password-strength-fill");

    if (!label || !fill) {
        return;
    }

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    const levels = [
        {
            text: "",
            width: "0%"
        },
        {
            text: "Weak",
            width: "25%"
        },
        {
            text: "Medium",
            width: "50%"
        },
        {
            text: "Good",
            width: "75%"
        },
        {
            text: "Strong",
            width: "100%"
        }
    ];

    const level = levels[score];

    label.textContent = level.text;
    fill.style.width = level.width;
}

function handleSignUp(form) {
    clearMessage();

    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const termsAccepted = formData.get("terms");

    if (!name || !email || !password || !confirmPassword) {
        showMessage("Please fill in all fields.");
        return;
    }

    if (!termsAccepted) {
        showMessage("Please accept the Terms and Privacy Policy.");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
    }

    const existingUser = getStoredUser();

    if (existingUser && existingUser.email === email) {
        showMessage("An account with this email already exists.");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "catalystUser",
        JSON.stringify(user)
    );

    switchAuth("signin");

    setTimeout(() => {
        const emailInput = document.getElementById("signin-email");

        if (emailInput) {
            emailInput.value = email;
            emailInput.focus();
        }

        showMessage(
            "Account created successfully. You can now sign in.",
            "success"
        );
    }, 400);
}

function handleSignIn(form) {
    clearMessage();

    const formData = new FormData(form);

    const email = formData.get("email")?.trim().toLowerCase();
    const password = formData.get("password");
    const rememberMe = formData.get("remember");

    const storedUser = getStoredUser();

    if (!email || !password) {
        showMessage("Please enter your email and password.");
        return;
    }

    if (!storedUser) {
        showMessage(
            "No Catalyst account was found. Create an account first."
        );
        return;
    }

    if (
        email !== storedUser.email ||
        password !== storedUser.password
    ) {
        showMessage("Incorrect email or password.");
        return;
    }

    const session = {
        name: storedUser.name,
        email: storedUser.email,
        loggedInAt: new Date().toISOString()
    };

    sessionStorage.setItem(
        "catalystSession",
        JSON.stringify(session)
    );

    if (rememberMe) {
        localStorage.setItem(
            "catalystRemembered",
            "true"
        );
    } else {
        localStorage.removeItem("catalystRemembered");
    }

    window.location.href = "dashboard.html";
}

authCard.innerHTML = signInTemplate;

bindAuthEvents();