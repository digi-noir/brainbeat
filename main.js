// ── NAV HAMBURGER ──
const hamburger = document.getElementById("nav-hamburger");
const drawer = document.getElementById("nav-drawer");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  drawer.classList.toggle("open");
});

drawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    drawer.classList.remove("open");
  });
});

// ── CONTACT FORM ──
const contactForm = document.querySelector(".contact-form");
const submitBtn = document.getElementById("contact-submit");
const successMsg = document.getElementById("form-success");
const errorMsg = document.getElementById("form-error");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;
  successMsg.style.display = "none";
  errorMsg.style.display = "none";

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      successMsg.style.display = "block";
      contactForm.reset();
    } else {
      errorMsg.style.display = "block";
    }
  } catch {
    errorMsg.style.display = "block";
  }

  submitBtn.textContent = "Submit";
  submitBtn.disabled = false;
});

// ── ABOUT MODAL ──
const overlay = document.getElementById("service-modal");
const mEyebrow = document.getElementById("modal-eyebrow");
const mTitle = document.getElementById("modal-title");
const mBody = document.getElementById("modal-body");

let lastFocused = null;

function openModal(row) {
  lastFocused = row;
  mEyebrow.textContent = row.dataset.num + " — BrainBeat";
  mTitle.textContent = row.dataset.title;
  mBody.textContent = row.dataset.content;
  overlay.classList.add("active");
  document.getElementById("modal-close").focus();
}

document.querySelectorAll(".service-row[data-title]").forEach((row) => {
  row.addEventListener("click", () => openModal(row));
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(row);
    }
  });
});

function closeModal() {
  overlay.classList.remove("active");
  if (lastFocused) lastFocused.focus();
}

document.getElementById("modal-close").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
