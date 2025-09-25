// reveal sections
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("is_visible");
      observer.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll(".section_reveal").forEach(el=>observer.observe(el));

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",e=>{
    const target=document.querySelector(anchor.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});

// scroll spy (keeps chapter link highlighted)
const chapters=document.querySelectorAll("main section[id]");
const navLinks=document.querySelectorAll(".chapter_nav a");
const spy=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    const id=e.target.getAttribute("id");
    const link=document.querySelector('.chapter_nav a[href="#'+id+'"]');
    if(e.isIntersecting && link){
      navLinks.forEach(a=>a.classList.remove("active"));
      link.classList.add("active");
    }
  });
},{rootMargin:"-45% 0px -50% 0px", threshold:0});
chapters.forEach(sec=>spy.observe(sec));

// hero background image (webp first, png fallback)
window.addEventListener("load",()=>{
  const hero=document.querySelector(".hero_media");
  if(hero){
    // Force hero background immediately (webp first, png fallback)
    hero.style.backgroundImage =
      `image-set(url("assets/hero.webp") type("image/webp"),
                 url("assets/hero.png") type("image/png"))`;
    hero.style.backgroundPosition="center";
    hero.style.backgroundSize="cover";
    hero.style.backgroundRepeat="no-repeat";
  }
});