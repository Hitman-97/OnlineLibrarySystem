import React, { useState } from 'react';
import {
  BrowserRouter as re,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';
import { D, C } from '@reduxjs/toolkit';
import { pr, useDispatch, useSelector } from 'react-redux';

// this would include all the books 
const allbooks = [
  { id: 1, title: "George's Secret Key to the Universe", writer: "Lucy Hawking", genre: "Fiction" },
  { id: 2, title: "The Theory Of Everything", writer: "Stephen Hawking", genre: "Biography"},
  { id: 3, title: "Don't Believe Everything You Think", writer: "Joseph Nguyen", genre: ""}
];

//here you will be able to view the use of the redux
const library = c({
  name: 'library',
  i: ic,
  s:{
    add: (state, action) => {
      const nextId = state.length ? Math.max(...state.map(b => b.id)) + 1 : 1;
      state.push({ ...action.payload, id: nextId });
    }
  }
});

const { add } = library.actions;
const L= D({ reducer: { library: library.reducer } });

// This would include a nav bar to navigate 
const Nav = () => (
  <nav style={{ marginBottom: 12px}}>
    <Link to="/">Home</Link> 
    <Link to="/new">Add</Link>
  </nav>
);

//This would include a Precise Dashboard
const K= () => (
  <section>
    <h1>Online Books</h1>
    <p>Simply Browse Books</p>
    <ul>
      {["Fiction","Biography"].map(c => (
        <li key={c}><Link to={`/explore/${c}`}>{c}</Link></li>
      ))}
    </ul>
    <ul>
      <li><Link to="/read/1">George's Secret Key to the Universe</Link></li>
      <li><Link to="/read/2">The Theory Of Everything</Link></li>
    </ul>
  </section>
);

// here you  can search for a required  book
const Searchbook = () => {
  const { genre } = useParams();
  const [setQ, Q] = useState('');
  const library = useSelector(state => state.library);

  const same = library.filter(book =>
    (!genre || book.genre === genre) &&
    (book.title.toLowerCase().includes(Q.toLowerCase()) || book.writer.toLowerCase().includes(Q.toLowerCase()))
  );

  return (
    <section>
      <h2>{genre ? `${genre} Books` : 'Search'}</h2>
      <input
        placeholder="search"
        value={Q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul>
        {same.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.writer} - <Link to={`/read/${book.id}`}>info</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

//This tells the info about the book
const T = () => {
  const { Y } = useParams();
  const navigate = useNavigate();
  const H = useSelector(state => state.library.find(b => b.id === Number(Y)));

  if (!H) return <div><h2>Book Does not exist</h2></div>;

  return (
    <article>
      <h2>{H.title}</h2>
      <p><b>Author:</b> {H.writer}</p>
      <p><b>Overview:</b> {H.summary}</p>
      <p><b>Rating:</b> {H.stars} / 5</p>
      <button onClick={() => navigate('/explore')}>← return</button>
    </article>
  );
};

// A Form to find books or to view the required or necessary book
const P = () => {
  const [setE,E] = useState({title: "",writer: "",genre: ""});
  const [setg,g] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const O = (e) => {
    const { name, value } = e.target;
    setE(prev => ({ ...prev, [name]: value }));
  };

  const v = () => {
    const h = {};
    Object.entries(E).forEach(([key, val]) => {
      if (!val) h[key] = "Required";
    });
    setg(h);
    return Object.keys(h).length === 0;
  };

  const submission = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(includeBook(E));
    navigate("/explore");
  };

  return (
    <form onSubmit={submission}>
      <h2>Add New Book</h2>
      <input name="title"  value={E.title} onChange={O} />
      {g.title && <div>{g.title}</div>}
      <br />
      <input name="writer" placeholder="author" value={g.writer} onChange={O} />
      {g.writer && <div>{g.writer}</div>}
      <br />
      <input name="genre" value={E.genre} onChange={O} />
      {g.genre && <div>{g.genre}</div>}
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

// This would lead to display a error
const M = () => (
  <div>
    <h2>Page Not Found</h2>
    <Link to="/">Return</Link>
  </div>
);


const OnlineLibrarysystem = () => (
  <Pr store={libraryStore}>
    <re>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read/:bookId" element={<About Books />} />
        <Route path="/new" element={<New Books />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </re>
  </Pr>
);

export default OnlineLibrarysystem;


