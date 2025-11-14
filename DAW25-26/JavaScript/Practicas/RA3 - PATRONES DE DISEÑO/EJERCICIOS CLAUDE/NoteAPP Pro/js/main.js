'use strict';

import { NoteManager } from "./patterns/noteManager.js";

const btnSubmit = document.getElementById("btnSubmit");
const manager = new NoteManager();

btnSubmit.addEventListener("click", manager.addNote);
document.addEventListener("DOMContentLoaded", manager.renderNotes());