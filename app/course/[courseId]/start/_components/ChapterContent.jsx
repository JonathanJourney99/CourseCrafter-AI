import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

function ChapterContent({ chapter, content }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.title}</h2>
      <p className="text-gray-500">{chapter?.description}</p>

      {/* Video */}
      <div className="flex justify-center my-6">
        <YouTube
          videoId={content?.videoId}
          opts={opts}
          title={content?.videoTitle || "Chapter Video"} // Accessible title
        />
      </div>

      {/* Sections */}
      <div>
        {content?.content?.chapter?.sections?.map((section, index) => {
          return (
            <div key={index} className="p-5 bg-sky-50 mb-3 rounded-lg">
              <h2 className="font-medium text-lg">{section?.title}</h2>
              <ReactMarkdown className="whitespace-pre-wrap">
                {section?.description}
              </ReactMarkdown>

              {section?.code_example?.code && (
                <div
                  className="p-4 bg-black text-white rounded-md mt-3"
                  language={section?.code_example?.language}
                >
                  <pre>
                    <code>{section?.code_example?.code}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterContent;
