import { Contact } from "../types/contact";

// Используйте локальный json-server (по умолчанию http://localhost:3002)
// Для запуска: npm run server (использует mock/contacts.json)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/contacts";

export async function fetchContacts(): Promise<Contact[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  const data = await response.json();
  return data;
}

export async function fetchContactById(id: number): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch contact");
  }
  const contact = await response.json();
  return contact;
}

export async function createContact(
  contact: Omit<Contact, "id">
): Promise<Contact> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  const data = await response.json();
  return data;
}

export async function updateContact(contact: Contact): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  const data = await response.json();
  return data;
}

export async function deleteContact(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
}
