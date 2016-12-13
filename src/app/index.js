import { init } from "void.js";
import { render, view } from "./view.js";
import { model } from "./model.js";
import { recreateField } from "./handlers.js";

const $ = init({
    model,
    view,
    render
});

$(recreateField, null);
