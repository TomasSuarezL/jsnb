import "./preview.css";
import React, { useEffect, useRef } from "react";

const html = `
<html>
  <head></head>
  <body>
    <div id="root">
    </div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>RuntimeError</h4>' + err + '</div>'
        console.error(err);
      }  

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      })

      window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch(err) {
            handleError(err);
          }
        }, false);
    </script>
  </body>
</html>  
`;

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe title="preview" sandbox="allow-scripts" srcDoc={html} ref={iframe}></iframe>
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
