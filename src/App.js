// import axios from "axios"
// import React, { useEffect, useState } from "react"
// import InfiniteScroll from "react-infinite-scroll-component";
// const App = () => {

//   const [data, setData] = useState([])
//   const [hasMore, setHasMore] = useState(true)

//   const fetchData = async () => {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_start=${data.length}&_limit=10`)
//     const req = response.data
//     console.log(req);
//     setData((post)=>[...post, ...req]);
//     setData(req)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   return (
//     <>
//       <InfiniteScroll
//         dataLength={data.length}
//         next={fetchData}
//         hasMore={hasMore}
//         loader={<h3> Loading...</h3>}
//         endMessage={<h4>Nothing more to show</h4>}
//       >
//         <div className="container-fluid">
//           <table className="table">
//             <tbody>
//               <tr>
//                 <th>UserID</th>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Completed</th>
//               </tr>
//               {
//                 data.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.userId}</td>
//                     <td>{item.id}</td>
//                     <td>{item.title}</td>
//                     <td>{item.completed ? "true" : "false"}</td>
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//         </div>
//       </InfiniteScroll>
//     </>
//   )
// }

// export default App


import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react"
import Spinner from "./components/Spinner";
import EndMsg from "./components/EndMsg";

function App() {

  const [items, setItems] = useState([])

  const [noMore, setnoMore] = useState(true)

  const [page, setpage] = useState(2)

  useEffect(() => {

    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
      );
      const data = await res.json()
      console.log(data);
      setItems(data)
    }
    getComments();

  }, [])

  console.log(items);

  const fetchComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const data = await res.json()
    return data
  }

  const fetchData = async() => {
    const commentsFormServer=await fetchComments()
    setItems([...items, ...commentsFormServer]);   

    if(commentsFormServer.length ===0 || commentsFormServer.length < 20){
      setnoMore(false)
    }

    setpage(page+1)
  }
  return (
    <>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<Spinner/>}
        endMessage={<EndMsg/>}
      >

        <div className="container-fluid">
          <table className="table">
            <tbody>
              <tr>
                <th>PostId</th>
                <th>ID</th>
                <th>name</th>
                <th>Email</th>
                <th>body</th>
              </tr>
              {
                items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.postId}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.body}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default App