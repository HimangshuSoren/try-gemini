import React from 'react'
import { useState, useRef } from 'react'

const GeminiApi = () => {
    const [reply, setReply] = useState("")
    const prompt = useRef()


    const formatText = (text) => {
        return text
            .split("\n")
            .map((line, index) => {
                if (line.startsWith("  * ")) {
                    let formattedLine = line.replace("  * ", "");
                    let colonIndex = formattedLine.indexOf(":");
                    if (colonIndex !== -1) {
                        let boldText = formattedLine.slice(0, colonIndex);
                        let normalText = formattedLine.slice(colonIndex);
                        return (
                            <p key={index}>
                                <strong>{boldText}</strong>
                                {normalText}
                            </p>
                        );
                    }
                    return <p key={index}>{formattedLine}</p>;
                }
                return <p key={index}>{line}</p>;
            });
    };


    async function getReply(e) {
        if ((e.key === "Enter") || (e.type === "click")) {

            setReply("Loading...")
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyCROmB0hgDfmnxCsdGHQQqYEwbNiMxIAAI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt.current.value }]
                    }]
                })
            })
            const data = await response.json()
            console.log(data)
            let d = data.candidates[0].content.parts[0].text
            setReply("")

            setReply(formatText(d))

        }
    }

    return (
        <div className="flex-col justify-center items-center min-h-screen  box-border">
            <div className="w-full min-w-full max-w-4xl px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-between">
                <div className=" my-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"> <strong><em>TRY-GEMINI </em></strong></div>
                <div className="border-2 border-blue-500 rounded-lg p-6 mt-6 min-h-[200px] text-lg w-full">
                    {reply}
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-2 m-5">
                    <input
                        onKeyDown={getReply}
                        ref={prompt}
                        type="text"
                        placeholder="Ask me Anything..."
                        className="flex-1 border border-gray-300 rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={getReply}
                        className="w-[18%] min-w-[100px] bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg text-lg transition-transform active:scale-95"
                    >
                        <strong>
                            <em>Send</em>
                        </strong>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default GeminiApi
