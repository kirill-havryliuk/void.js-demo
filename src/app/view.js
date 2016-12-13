import React from "react";
import ReactDOM from "react-dom";
import { annotate } from "void.js";
import { recreateField, onHeightInput, onWidthInput, onCellClick } from "./handlers.js";

export const render = annotate("RENDER!", newElement => {
    ReactDOM.render(newElement, document.querySelector("#container"));
});

export const view = (model, $) => {
    const { field } = model;
    return <div id="wrapper">
        { model.done === true ? <div id="gj" onClick={ $(recreateField) }>Good Job!</div> : null }
        <div id="fholder">
            <div id="field">
                {
                    model.field === null ? null : field.map((row, rowIdx) => <div className="row" >
                        {
                            row.map((cell, colIdx) => {
                                const activeClass = cell === false ? "" : "active";
                                return <div
                                    className={ `cell ${activeClass}` }
                                    data-rowidx={ rowIdx }
                                    data-colidx={ colIdx }
                                    onClick={ $(onCellClick) } />;
                            })
                        }
                    </div>)
                }
            </div>
        </div>
        <div id="controls">
                <div className="slider">
                    <div className="label">Width:</div>
                    <div className="label">{ model.width }</div>
                    <input type="range" defaultValue={ model.width } max="30" min="3" step="1" onInput={ $(onWidthInput) } />
                </div>
                <div className="slider">
                    <div className="label">Height:</div>
                    <div className="label">{model.height}</div>
                    <input type="range" defaultValue={ model.height } max="30" min="3" step="1" onInput={ $(onHeightInput) } />
                </div>
                <button id="recrFld" onClick={ $(recreateField) }> Recreate </button>
        </div>
        <div id="note">Try to disable all cells :)</div>
    </div>;
};

