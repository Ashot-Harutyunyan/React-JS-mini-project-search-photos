import './style.app.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [elements, setElements] = useState([])
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [bigIndex, setBigIndex] = useState(null)

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchPhotos(inputValue)
    }
  }, [inputValue])

  const fetchPhotos = async (query) => {
    setLoading(true)
    try {
      const ACCESS_KEY = 'Nc2e3O3l1llOEeg7QwB4wDKuAeD8u3CCeWYoiyRq4ZE';
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${ACCESS_KEY}`
      );
      setElements(response.data.results)
      setError('')
    } catch (error) {
      setError('Error fetching the image')
      setElements([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputValue(e.target.text.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search"
        />
        <button type="submit">Submit</button>
      </form>
      
      <div className="container">
        {loading && <p style={{textAlign: 'center', fontSize: '24px'}} >Loading...</p>}
        {error && <p>{error}</p>}
        {elements.map((photo, index) => (
          <div
            className={bigIndex === index ? 'big' : ''}
            key={photo.id}
            style={{ textAlign: 'right' }}
            onClick={() => setBigIndex(bigIndex === index ? null : index)}
          >
            {bigIndex === index && (
              <p className='close'
                style={{ display: 'block' }}
                onClick={() => setBigIndex(null)}
              >
                &#xd7;
              </p>
            )}
            <img src={photo.urls.full} alt={photo.description} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App