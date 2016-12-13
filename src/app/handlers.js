import { annotate } from "void.js";
import { randomInt, createArray } from "utils.js";

const invert = (field, rowIdx, colIdx) => {
    /* eslint-disable comma-spacing */
    const patch = [
        [false, true , false],
        [true , true , true ],
        [false, true , false]
    ];
    /* eslint-enable comma-spacing */

    const centerPatchRowIdx = 1;
    const centerPatchColIdx = 1;
    return patch.reduce((field, patchRow, patchRowIdx) => {
        const fieldRowIdx = rowIdx + patchRowIdx - centerPatchRowIdx;
        const row = field[fieldRowIdx];
        if (row === undefined)
            return field;
        field[fieldRowIdx] = patchRow.reduce((fieldRow, patchCell, patchColIdx) => {
            const colToPatchIdx = colIdx + patchColIdx - centerPatchColIdx;
            if (fieldRow[colToPatchIdx] !== undefined && patchCell === true)
                fieldRow[colToPatchIdx] = !fieldRow[colToPatchIdx];
            return fieldRow;
        }, field[fieldRowIdx].slice());
        return field;
    }, field.slice());
};
const checkAllDisabled = field => !field.reduce((prev, row) => prev || row.reduce((prev, cell) => cell || prev, false), false);
export const onCellClick = annotate("Cell Clicked", (model, ev) => {
    const rowIdx = parseInt(ev.target.dataset.rowidx);
    const colIdx = parseInt(ev.target.dataset.colidx);
    const newField = invert(model.field, rowIdx, colIdx);
    return { field: newField, done: checkAllDisabled(newField) };
});


export const recreateField = annotate("Recreate field", model => {
    let shuffleTimes = model.width * model.height;
    let newField = createArray(model.height).map(() =>
        createArray(model.width).map(() => false)
    );

    while (shuffleTimes--) {
        const rowIdx = randomInt(model.height - 1);
        const colIdx = randomInt(model.width - 1);
        newField = invert(newField, rowIdx, colIdx);

    }
    return { field: newField, done: false };
});


export const onWidthInput = annotate("Width change", (model, ev) => {
    const newWidth = ev.target.valueAsNumber;
    return { width: newWidth };
});


export const onHeightInput = annotate("Width change", (model, ev) => {
    const newHeight = ev.target.valueAsNumber;
    return { height: newHeight };
});
