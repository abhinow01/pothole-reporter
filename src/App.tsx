import { useState ,  useCallback } from 'react';
import { GoogleMap, LoadScript, Marker , useJsApiLoader } from '@react-google-maps/api';
import { MapPin, Camera, Send, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import './App.css'
const containerStyle = {
  width : '100%',
  height : '400px'
}

const center = {
  lat : 28.6139,
  lng : 77.2090
}
type LatLng = {
  lat: number;
  lng: number;
};
// const google_maps_api_key = import.meta.vite.env.VITE_GOOGLE_MAPS_API_KEY
function App() {
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace this
  });
const [map, setMap] = useState<google.maps.Map | null>(null);
const [marker , setMarker] = useState<LatLng | null>(null);
const [photo , setPhoto] = useState<File | null>(null);
const [address , setAddress] = useState<string>('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [photoPreview , setPhotoPreview] = useState<string | null>(null)
const onLoad = useCallback((map : google.maps.Map)=> {
  console.log("map data" , map)
    setMap(map);
} , [])

const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e)=>{
        setPhotoPreview(e.target?.result as string)
      };
      reader.readAsDataURL(file);
    }
  }
const handleMapClick = async (e : google.maps.MapMouseEvent) => {
  if(!e.latLng) return ; 
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  setMarker({lat , lng}); 
  const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDsKf_c4KEVpkHd2zP17PubYObK6ONE6Ro`
    );
  const data = await res.json() 
  const addr = data.results?.[0]?.formatted_address || 'Unknown location';
  setAddress(addr)
}

const handleSubmit = async () =>{
  if(!marker || !photo) return alert('Location and photo required');

  const formData = new FormData();
  formData.append('lat' , marker.lat.toString());
  formData.append('lng' , marker.lng.toString());
  formData.append('address' , address);
  formData.append('photo' , photo);

  const response = await fetch('http://localhost:5000/report' , {
    method : 'POST' , 
    body : formData
  });

  if(response.ok){
      alert('Report sent !')
      setMarker(null);
      setPhoto(null);
      setAddress('');
  }else{
    alert('Error sending report.');
  }

  

}

const resetForm = ()=>{
  setMarker(null);
  setPhoto(null)
  setAddress('');
  setPhotoPreview(null);
}


  return (
    <>
  <div className='min-h-screen bg-gradient-to-br from-blue-100 via-white to-orange-100 '>
  <div className='conainer mx-auto px-4 py-8 max-w-4xl '>
    {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pothole Reporter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Help improve our roads by reporting potholes in your area
          </p>
        </div>

  {/* Map Section */}
  <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
  <div className='flex items-center gap-2 mb-4'>
   <MapPin className="w-5 h-5 text-blue-600" />
   <h2 className="text-xl font-semibold text-gray-800">Select Location</h2>
  </div>
  <p className="text-gray-600 mb-4">Click on the map to mark the pothole location</p>
  {/* map  */}
    <div className='relative'>
      {isLoaded ?  (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={{
            styles : [
              {
                featureType : 'all',
                elementType : 'geometry.fill',
                stylers: [{saturation : -10 }]
              }
            ] 
          }}
        >
          {marker && 
          <Marker 
          position={marker} 
          icon={{
            path : google.maps.SymbolPath.CIRCLE,
            scale : 8,
            fillColor : '#ef4444',
            fillOpacity : 0.8,
            strokeColor : '#dc2626',
            strokeWeight : 2
          }}/>}
        </GoogleMap>
      ) : (
        <div className='flex items-center justify-center h-96 bg-gray-100 rounded-2xl'>
          <div className='text-center'>
        <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 '>
        <p className='text-gray-600'>Loading map ...</p>
        </div>
          </div>

        </div>
      )}
  </div>
  </div>
    {/* address display  */}
    {
      address && (
        <div className='mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <div className='flex items-center gap-2 '>
            <CheckCircle className="w-5 h-5 text-green-600" />
          <span className='font-medium text-gray-800'>Selected Address:</span>
            </div>
            <p className='text-gray-700 mt-1 '>{address}</p>
        </div>
      )
    }
  </div>
  {/* photo upload section  */}
  <div className='bg-white rounded-2xl shadow-xl px-10 translate-x-30 py-6 mb-8 w-4/5 '>
    <div className='flex items-center gap-2 mb-4 '>
    <Camera className='w-5 h-5 text-blue-500'/>
    <h2 className='text-xl font-semibold text-gray-800'>Upload photo</h2>
    </div>
    <p className='text-gray-600 mb-4 '>Take a clear photo of the potholes</p>

    <div className='space-y-4'>
    <div className='relative'>
    <input
    type='file'
    accept='image/*'
    onChange={handleFileChange}
    className='hidden'
    id="photo-upload"
    />
    <label
    htmlFor='photo-upload'
    className='flex items-center justify-center w-full p-6 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100   '
    >
    <div className='text-center'>
    <Upload className='w-12 h-12 text-blue-600 mx-auto mb-2'/>
    <p className='text-blue-600 font-medium'>{photo ? 'Change Photo' : 'Click to upoload photo '}</p>
    <p className='text-gray-500 text-sm'>Supports JPG, PNG, WEBP</p>
    </div>
    </label>
    </div>
    </div>


   {/* photo preview  */}
   {
    photoPreview && (
      <div className='relative'>
      <img
      src={photoPreview}
      alt="photo preview"
      className='w-full h-48 object-cover rounded-lg border border-gray-200 '
      />
      <button
      onClick={()=>{
        setPhoto(null)
        setPhotoPreview(null)
      }}
      className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors'
      >
      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      </button>
      </div>
    )
   }

   {/* action buttons  */}
   <div className='flex justify-center gap-4 my-4 '>
   <button
   className='px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium'
   onClick={resetForm}
   >
    Clear Form 
   </button>
   <button
   disabled={!marker || !photo || isSubmitting}
   className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 lex items-center gap-2 ${
    !marker || !photo || isSubmitting ? 
    'bg-gray-300 text-gray-500 cursor-not-allowed' 
    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg ' 
    }`}
   onClick={handleSubmit}
   >
    {
      isSubmitting ? (
        <>
      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
        Submiting...
        </>
      ) : (
      <>
      <div className='flex items-center justify-center gap-x-2 '>
      <Send className="w-5 h-5" />
      Submit Report
      </div>
      
      </>)
    }
   </button>
   </div>

{
  (!marker || !photo) && (
    <div className='mt-6 p-4 bg-amber-50 bprder border-amber-200 rounded-lg'>
      <div className='flex items-center gap-2'>
      <AlertCircle className="w-5 h-5 text-amber-600" />
      <span>
        {
          !marker && !photo 
          ? 'Please select a location on the map and upload a photo' 
          : !marker
          ? 'Please select a location on the map'
          : 'Please upload a photo'
        }
      </span>
      </div>
    </div>

  )
}

  </div>
  </div>
  {/* </div> */}
    </>
  )
}

export default App
