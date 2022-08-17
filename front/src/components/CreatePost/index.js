import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import { getItem } from "./../../utils/localStorage.js";

export default function CreatePost(props) {
    const userInfo = getItem("user");

    const {setPosts, image,getPosts} = props
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { userId, token } = userInfo;

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let hashtags = []
        if (message === ""){
            setMessage(null);
        }else{
            hashtags = handleHashtags(message);
        }

        const body = {
            message,
            url,
            userId,
            hashtags
        }

        const config = {  
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(`${process.env.REACT_APP_URL}/posts`, body, config);
        promise.then(res => {
            setLoading(false);
            setUrl('');
            setMessage('');
            getPosts();

            const postPromise = axios.post(`${process.env.REACT_APP_URL}/hashtag`, body, config);
            postPromise
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        })
        promise.catch(err => {
            alert("Houve um erro ao publicar seu link")
            setLoading(false);
        })
    }

    function handleHashtags(text){
        const arrHashtags = text.split(' ').filter(v=> v.startsWith('#'))
        return arrHashtags.map(v=>{
            return v.replace('#','')
        })
    }


    return (
        <Create>
            <User>
                <img src={image} alt="ph" />
            </User>
            <Publish>
                <h3>What are you going to share today?</h3>
                <Form onSubmit={handleSubmit}>
                    <input 
                        className="url" 
                        type="url" 
                        required 
                        placeholder="http://..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                        />
                    <textarea 
                        className="text" 
                        placeholder="Awesome article about #javascript"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                        ></textarea>
                    <button type="submit" disabled={loading}>{loading ? "Publicando..." : "Publicar"}</button>
                </Form>
            </Publish>
        </Create>
    );
}

const Create = styled.article`
    width: 100%;
    height: 100%;
    max-width: var(--post-max-width);
    background: #FFFFFF;
    margin-bottom: var(--post--margin--bottom);
    padding: var(--padding-post-container);
    display: flex;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: var(--post-border-radius);
    font-family: var(--font-family-main);
`;


const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 69px;
    svg {
        font-size: 22px;
    }
    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-bottom: 17px;
    }
`;

const Publish = styled.div`
    width: 100%;
    min-height: 207px;
    display: flex;
    flex-direction: column;
    h3 {
        
        font-weight: 300;
        font-size: 20px;
        margin: 7px 0;
        color: #707070;
        line-height: 24px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    input, textarea{
        width: 100%;
        background: #EFEFEF;
        border-radius: 5px;
        margin: 5px 0;
        padding: 5px;
    }
    input::placeholder, textarea::placeholder {
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
    .url{
        height: 30px;
    }
    .text{
        height: 70px;
        border: none;
        resize: none;
    }
    .text:focus, input:focus{
        outline: none;
    }
    button{
        margin-top: 5px;
        background: #1877F2;
        border-radius: 5px;
        font-size: 14px;
        width: 115px;
        height: 27px;
        color: #FFFFFF;
        cursor: pointer;
    }
`