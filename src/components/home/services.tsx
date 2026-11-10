const services = [
  {
    title: "Complimentary delivery",
    body: "Free standard shipping on every order, tracked to your door.",
  },
  {
    title: "Easy returns",
    body: "Return or exchange within 30 days, free of charge.",
  },
  {
    title: "Gift wrapping",
    body: "Each piece arrives in signature packaging with a handwritten note.",
  },
  {
    title: "Client advisors",
    body: "Speak with a stylist by phone, email or chat, seven days a week.",
  },
];

export function Services() {
  return (
    <section aria-label="Services" className="pb-section">
      <ul className="container-site grid border-y sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li
            key={s.title}
            className={`py-8 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} ${
              i === 2 ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0" : ""
            } ${i === 1 ? "" : ""}`}
          >
            <h3 className="eyebrow">{s.title}</h3>
            <p className="mt-3 text-small text-mute">{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
