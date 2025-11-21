import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as contactsApi from "../services/contactsApi";
import { Contact } from "../types/contact";

interface ContactsState {
  contacts: Contact[];
  filteredContacts: Contact[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentContact: Contact | null;
}

const initialState: ContactsState = {
  contacts: [],
  filteredContacts: [],
  searchQuery: "",
  loading: false,
  error: null,
  currentContact: null,
};

// Async thunks
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await contactsApi.fetchContacts();
    return response;
  }
);

export const fetchContactById = createAsyncThunk(
  "contacts/fetchContactById",
  async (id: number) => {
    const response = await contactsApi.fetchContactById(id);
    return response;
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact: Omit<Contact, "id">) => {
    const response = await contactsApi.createContact(contact);
    return response;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact: Contact) => {
    const response = await contactsApi.updateContact(contact);
    return response;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: number) => {
    await contactsApi.deleteContact(id);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredContacts = state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.filteredContacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })
      // Fetch contact by ID
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contact";
      })
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.unshift(action.payload);
        state.filteredContacts.unshift(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create contact";
      })
      // Update contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
        const filteredIndex = state.filteredContacts.findIndex(
          (c) => c.id === action.payload.id
        );
        if (filteredIndex !== -1) {
          state.filteredContacts[filteredIndex] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update contact";
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c.id !== action.payload);
        state.filteredContacts = state.filteredContacts.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete contact";
      });
  },
});

export const { setSearchQuery, clearCurrentContact } = contactsSlice.actions;
export default contactsSlice.reducer;
