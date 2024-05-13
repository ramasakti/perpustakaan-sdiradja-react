import React from "react";
import Frame from '../components/Frame.jsx'

export default function ISBN(params) {
    return (
        <>
            <Frame>
                <div className="mb-3">
                    <label className="form-label">ISBN Code</label>
                    <input type="text" className="form-control" name="isbn" placeholder="ISBN Code" />
                </div>
            </Frame>
        </>
    )
};
