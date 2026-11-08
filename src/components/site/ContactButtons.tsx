import { contacts } from "../../data/contacts";

export function ContactDetails() {
  return <div className="header-contact-details">
    <span className="contact-caption">{contacts.demo ? "Тестовые контакты" : "Свяжитесь с нами"}</span>
    {contacts.phoneHref && !contacts.demo ? <a className="header-phone" href={contacts.phoneHref}>{contacts.phone}</a> : <span className="header-phone">{contacts.phone}</span>}
    {!contacts.demo ? <a className="header-email" href={`mailto:${contacts.email}`}>{contacts.email}</a> : <span className="header-email">{contacts.email}</span>}
  </div>;
}

export function MessengerButtons({ labels = false }: { labels?: boolean }) {
  return <div className={`messenger-buttons${labels ? " messenger-buttons-labeled" : ""}`} role="group" aria-label="Мессенджеры">
    {[{ name: "Max", url: contacts.max, icon: "/icons/max.svg" }, { name: "Telegram", url: contacts.telegram, icon: "/icons/telegram.svg" }].map(item => {
      const content = <><img src={item.icon} alt="" width="28" height="28" /><span className={labels ? undefined : "sr-only"}>{item.name}</span></>;
      return item.url && !contacts.demo
        ? <a key={item.name} href={item.url} className="messenger-button" target="_blank" rel="noopener noreferrer" aria-label={`Написать в ${item.name}`} title={`Написать в ${item.name}`}>{content}</a>
        : <button key={item.name} type="button" className="messenger-button" disabled aria-label={`${item.name} — контакт пока не подключён`} title={`${item.name}: контакт будет добавлен перед запуском`}>{content}</button>;
    })}
  </div>;
}
