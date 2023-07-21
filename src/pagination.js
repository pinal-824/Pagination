import React, { useState } from "react";
export function Pagination() {
    const [input, setInput] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        age: "",
    });


    const [search, setSearch] = useState(JSON.parse(localStorage.getItem("search")) || []);

    function change(e) {
        console.log(e.target)
        let { name, value } = e.target
        setInput({ ...input, [name]: value, no: search?.length + 1 })

    }
    function Info(e) {
        console.log(e.target)
        setSearch([...search, input])
        localStorage.setItem("search", JSON.stringify(search))
    }
    console.log(input);
    // Pagination
    const [currentpage, setCurrentpage] = useState(1);
    const recordPage = 2;
    const npage = Math.ceil(search?.length / recordPage);
    function prepage() {
        if (currentpage !== 1) {
            setCurrentpage(currentpage - 1)
        }
    }
    function ChangeCPage(id) {
        console.log(id)
        setCurrentpage(id)
    }
    function nextPage() {
        if (currentpage !== npage) {
            setCurrentpage(currentpage + 1)
        }
    }
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(search.length / recordPage); i++) {
        pageNumbers.push(i);
    }
    console.log("pageNumbers", pageNumbers, search?.slice(recordPage * currentpage - recordPage, currentpage * recordPage))
    return (
        <>

            <div>
                <form>
                    <h1>React form 6</h1>
                    <label htmlFor="name"> Name : </label>
                    <input type="text" id="name" name="name" value={input.name} onChange={change} /><br /><br />
                    <label htmlFor="surname"> Surname : </label>
                    <input type="text" id="surname" name="surname" value={input.surname} onChange={change} /><br /><br />
                    <label htmlFor="email">Email : </label>
                    <input type="email" id="email" name="email" value={input.email} onChange={change} /><br /><br />
                    <label htmlFor="phone"> Phone : </label>
                    <input type="tel" id="phone" name="phone" value={input.phone} onChange={change} /><br /><br />
                    <label htmlFor="age">Age : </label>
                    <input type="number" id="age" name="age" value={input.age} onChange={change} /><br /><br />
                    <button type="button" onClick={Info}>submit</button>

                </form>
            </div>
            <table>
                <thead>
                    <th>name</th>
                    <th>surname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>age</th>
                </thead>
                <tbody>
                    {search?.slice(recordPage * currentpage - recordPage, currentpage * recordPage).map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.age}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button size="20" onClick={(e) => prepage(e)} >pre</button>
            {pageNumbers.map((item) => <button onClick={(e) => ChangeCPage(parseInt(e.target.innerText))}>{item}</button>)}
            <button size="20" onClick={(e) => nextPage(e)} >next</button>
        </>
    )
}