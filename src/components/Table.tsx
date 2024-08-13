import React from 'react';


const Table = () => {
  return <table>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Book Thief</td>
          <td>Markus Zusak</td>
          <td>Historical Fiction</td>
        </tr>
        <tr>
          <td>The Cruel Prince</td>
          <td>Holly Black</td>
          <td>Fantasy</td>
        </tr>
        <tr>
          <td>The Silent Patient</td>
          <td>Alex Michaelides</td>
          <td>Psychological Fiction</td>
        </tr>
      </tbody>
    </table>
}

export default Table;
