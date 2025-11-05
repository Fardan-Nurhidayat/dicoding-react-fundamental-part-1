import { notes } from "./data";
const LOCAL_STORAGE_KEY = "notes_app_data_v1";

export async function getAllNotes() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  }
  return notes;
}

export async function getNoteById(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let allNotes = [];
  
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        allNotes = parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  } else {
    allNotes = notes;
  }
  
  return allNotes.find((note) => note.id === id) || null;
}

export function archiveNoteById(id) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let allNotes = [];
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        allNotes = parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  } else {
    allNotes = notes;
  }
  const updatedNotes = allNotes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  }
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  return updatedNotes;
}

export function unarchiveNoteById(id) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let allNotes = [];
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        allNotes = parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  } else {
    allNotes = notes;
  }
  const updatedNotes = allNotes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }
    return note;
  }
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  return updatedNotes;
}

export function deleteNoteById(id) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let allNotes = [];
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        allNotes = parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  } else {
    allNotes = notes;
  }
  const updatedNotes = allNotes.filter((note) => note.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  return updatedNotes;
}



export function addNote(title, body) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let allNotes = [];
  
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        allNotes = parsed;
      }
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
    }
  } else {
    allNotes = [...notes];
  }
  
  const newNote = {
    id: `${Date.now()}`,
    title,
    body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    archived: false
  };
  
  const updatedNotes = [newNote, ...allNotes];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  return newNote;
}

export const formatedDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}