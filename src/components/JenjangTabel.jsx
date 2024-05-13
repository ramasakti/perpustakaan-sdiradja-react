import React from "react";

const JenjangTabel = ({ jenjang, kelasList }) => (
    <>
        <h3>{jenjang}</h3>
        <table className="table table-relative">
            <thead>
                <tr>
                    <th>Kelas</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {kelasList.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.kelas}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);

export default JenjangTabel;
