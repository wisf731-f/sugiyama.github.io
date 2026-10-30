const menuItems = [
  {
    name: "ひだまりブレンド",
    category: "COFFEE",
    price: "¥520",
    description: "やさしい甘みと香ばしさ。毎日飲みたくなる定番の一杯。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "ひだまりブレンドのコーヒー"
  },
  {
    name: "季節のフルーツタルト",
    category: "BAKE",
    price: "¥680",
    description: "旬の果物をたっぷりのせた、店内仕込みの季節限定タルト。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "季節のフルーツタルト"
  },
  {
    name: "ふんわりカフェラテ",
    category: "COFFEE",
    price: "¥590",
    description: "ミルクの甘みとエスプレッソのコクを楽しむ、ほっとする一杯。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "ふんわりカフェラテ"
  },
  {
    name: "しゅわっとエスプレッソトニック",
    category: "SEASONAL",
    price: "¥620",
    description: "柑橘の香りとエスプレッソのほろ苦さ。午後にぴったりの爽やかな一杯。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "エスプレッソトニック"
  },
  {
    name: "レモンとポピーシードのケーキ",
    category: "BAKE",
    price: "¥480",
    description: "きゅんと甘酸っぱいレモンアイシングをかけた、しっとり焼き菓子。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "レモンとポピーシードのケーキ"
  },
  {
    name: "喫茶店のかためプリン",
    category: "DESSERT",
    price: "¥560",
    description: "卵のコクとほろ苦カラメル。さくらんぼを添えた、昔ながらのごほうび。",
    image: "https://placehold.jp/600x400.png?text=Item",
    imageAlt: "かためプリン"
  }
];

const testimonials = [
  {
    quote: "窓辺で飲むコーヒーが好きです。焼き菓子もおいしくて、つい長居してしまいます。",
    name: "近所のお客さま",
    visit: "30代・女性"
  },
  {
    quote: "ひとりでも入りやすく、スタッフさんの笑顔にも癒やされます。朝の楽しみになりました。",
    name: "朝の常連さま",
    visit: "40代・男性"
  },
  {
    quote: "季節のタルトが毎回楽しみ。友人とのおしゃべりにもぴったりのお店です。",
    name: "ご友人とご来店",
    visit: "20代・女性"
  }
];

const faqItems = [
  {
    question: "ひとりでも利用できますか？",
    answer: "もちろんです。カウンター席や窓辺の席もございますので、おひとりの時間をゆっくりお過ごしください。"
  },
  {
    question: "テイクアウトはできますか？",
    answer: "コーヒーと一部の焼き菓子をテイクアウトいただけます。ご注文の際にスタッフへお声がけください。"
  },
  {
    question: "営業時間と定休日を教えてください。",
    answer: "火曜日から日曜日の9:00〜18:00（ラストオーダー17:30）です。月曜日はお休みをいただいています。"
  }
];

const menuList = document.querySelector("#menu-list");
const voiceList = document.querySelector("#voice-list");
const faqList = document.querySelector("#faq-list");

menuList.innerHTML = menuItems.map((item) => `
  <article class="menu-card">
    <img src="${item.image}" alt="${item.imageAlt}" width="600" height="400" loading="lazy">
    <div class="menu-card-body">
      <div class="menu-card-meta"><span>${item.category}</span><span>${item.price}</span></div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    </div>
  </article>
`).join("");

voiceList.innerHTML = testimonials.map((testimonial) => `
  <article class="voice-card">
    <div class="voice-stars" aria-label="5つ星">★★★★★</div>
    <blockquote>${testimonial.quote}</blockquote>
    <div class="voice-author">
      <img src="https://placehold.jp/150x150.png?text=User" alt="" width="150" height="150" loading="lazy">
      <span>${testimonial.name}・${testimonial.visit}</span>
    </div>
  </article>
`).join("");

faqList.innerHTML = faqItems.map((item, index) => `
  <article class="faq-item">
    <h3 class="faq-item-heading">
      <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}" id="faq-question-${index}">
        <span class="faq-question-label"><strong>Q.</strong>${item.question}</span>
        <span class="faq-indicator" aria-hidden="true"></span>
      </button>
    </h3>
    <div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" hidden>
      <div class="faq-answer-inner"><p>${item.answer}</p></div>
    </div>
  </article>
`).join("");

faqList.addEventListener("click", (event) => {
  const question = event.target.closest(".faq-question");
  if (!question) return;

  const answer = document.querySelector(`#${question.getAttribute("aria-controls")}`);
  const faqItem = question.closest(".faq-item");
  const isExpanded = question.getAttribute("aria-expanded") === "true";
  question.setAttribute("aria-expanded", String(!isExpanded));
  answer.setAttribute("aria-hidden", String(isExpanded));

  if (isExpanded) {
    faqItem.classList.remove("is-open");
    answer.addEventListener("transitionend", (transitionEvent) => {
      if (transitionEvent.propertyName === "grid-template-rows" && question.getAttribute("aria-expanded") === "false") {
        answer.hidden = true;
      }
    }, { once: true });
    return;
  }

  answer.hidden = false;
  requestAnimationFrame(() => faqItem.classList.add("is-open"));
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
  mobileNav.hidden = isExpanded;
});

mobileNav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");
  mobileNav.hidden = true;
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const heroAnimation = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroAnimation
    .from(".site-header .brand-mark", { scale: 0, rotation: -180, duration: 0.65, ease: "back.out(2)" }, 0)
    .from(".hero-copy .eyebrow", { y: 30, rotation: -4, autoAlpha: 0, duration: 0.55 })
    .from(".hero-copy h1", { y: 70, rotation: 2, scale: 0.92, autoAlpha: 0, duration: 0.85, ease: "back.out(1.5)" }, "-=0.3")
    .from(".hero-description, .hero-copy > .button, .hero-note", {
      y: 24,
      scale: 0.96,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.12
    }, "-=0.35")
    .from(".hero-visual img", { scale: 1.04, autoAlpha: 0, duration: 1.1, ease: "power3.out" }, "-=0.65")
    .from(".visual-stamp", { scale: 0, rotation: -45, autoAlpha: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" }, "-=0.55");

  gsap.to(".visual-stamp", {
    y: -9,
    rotation: 15,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".hero-visual img", {
    yPercent: -7,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  gsap.utils.toArray(".section-heading, .section-topline").forEach((heading) => {
    gsap.from(heading.children, {
      y: 42,
      rotation: -2,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: heading,
        start: "top 88%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".feature-grid, .menu-grid, .voice-grid, .faq-list").forEach((group) => {
    gsap.from(group.children, {
      y: 64,
      rotation: (index) => index % 2 === 0 ? -3 : 3,
      scale: 0.88,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: group,
        start: "top 88%",
        once: true
      }
    });
  });

  menuList.querySelectorAll(".menu-card").forEach((card, index) => {
    const image = card.querySelector("img");
    const rotation = index % 2 === 0 ? -2 : 2;

    card.addEventListener("pointerenter", () => {
      gsap.to(card, { y: -12, rotation, scale: 1.035, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
      gsap.to(image, { scale: 1.1, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    });

    card.addEventListener("pointerleave", () => {
      gsap.to(card, { y: 0, rotation: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      gsap.to(image, { scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });
  });
}