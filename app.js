(() => {
  const B = {
    wa: "201285823912",
    n: "01285823912",
    tt: "https://www.tiktok.com/@fantasy.store19",
    items: [
      { n: "تيشيرتات كورة قدم", d: "أحدث التشكيلات", c: "جديد", img: "p1" },
      { n: "كوتشي رجالي وحريمي", d: "كوليكشن جديد", c: "كوتشي", img: "p2" },
      { n: "شنطة كورة", d: "مقاومة للماء ومسنّنة", c: "شنط", img: "p3" },
      { n: "ترتات ڤيتنامي", d: "خفيف ومريح للتمرين", c: "ترتات", img: "p4" },
      { n: "ملابس رياضية", d: "للتمرين واليوميات", c: "سبورت", img: "p5" },
      { n: "أدوات رياضية", d: "كل اللي محتاجه للتمرين", c: "أدوات", img: "p6" },
    ],
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا القطعة والمقاس على واتساب 01285823912 وهنرد عليك بالتفاصيل والمتاح."],
      ["فين محلاتكم؟", "فرعين في الإسكندرية: الأول بالمعمورة شارع ١٦ أمام مسجد بلال بن رباح، والتاني في شارع ٢٥ أمام محل فرفشة."],
      ["إيه اللي بتبيعوه؟", "ملابس رياضية: تيشيرتات كورة قدم، كوتشي، شنط كورة، ترتات وأدوات رياضية."],
      ["الأسعار فين؟", "بنزل العروض الجديدة على تيك توك، وكل الأسعار والتفاصيل بتيجي على واتساب — اسأل عن القطعة اللي عايزها."],
      ["في عروض ومسابقات؟", "أه، بنعمل مسابقات توقعات المباريات بجوائز وهدايا لمتابعينا، وبنعلنها كلها على حسابنا على تيك توك."],
    ],
  };

  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أسأل عن منتجات فانتازي ستور";

  // links
  ["#hdWa", "#mWa", "#heroWa"].forEach((s) => ($(s).href = wa(hello)));
  $("#fWa").href = wa(hello);
  $("#fWa").textContent = B.n;

  // marquee
  const bits = ["ملابس رياضية", "الإسكندرية — فرعين", "اطلب على واتساب", "تيك توك · fantasy.store19", "عروض ومسابقات"];
  $("#mq").innerHTML = [0, 1].map(() => bits.map((b) => `<span>${b}</span>`).join("")).join("");

  // products
  $("#grid").innerHTML = B.items
    .map(
      (it, i) => `<article class="pt rv" style="--d:${(i % 3) * 0.08}s" data-i="${i}">
      <div class="pi"><span class="chip">${it.c}</span><img src="img/${it.img}.jpg" alt="${it.n}" loading="lazy"></div>
      <div class="pm"><h3>${it.n}</h3><span class="ask">اسأل عن السعر</span></div>
      <button class="go" type="button">اطلب على واتساب</button>
    </article>`
    )
    .join("");
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".pt");
    if (!card) return;
    const it = B.items[+card.dataset.i];
    window.open(wa(`أهلاً، عايز أسأل عن: ${it.n}\nالتفاصيل: ${it.d}\nالمقاس: `), "_blank", "noopener");
  });

  // faq
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");

  // order form
  $("#askForm").onsubmit = (e) => {
    e.preventDefault();
    const v = $("#fAsk").value.trim();
    window.open(wa(v ? `أهلاً، عايز أطلب: ${v}` : hello), "_blank", "noopener");
  };

  // drawer
  const menu = $("#menu"), burger = $("#burger");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    root.classList.toggle("lock", open);
  };
  burger.onclick = () => setMenu(!menu.classList.contains("open"));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // reveals
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  } else document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));

  // loader → hero entrance
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    $("#loader").classList.add("gone");
    root.classList.remove("loading");
    root.classList.add("ready");
  };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1100));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4000);
  }
})();
