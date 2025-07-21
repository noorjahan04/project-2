import { Heart, Mail, Phone, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-indigo-700 text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold flex items-center">
            <Heart className="h-6 w-6 mr-2 text-yellow-400" />
            Volunteer Hub
          </h3>
          
          <p className="text-indigo-100 max-w-2xl">
            Connecting communities through meaningful volunteer opportunities.
          </p>
          
          <div className="flex space-x-6 my-6">
            <a 
              href="mailto:noorifms@gmail.com" 
              className="text-indigo-200 hover:text-yellow-400 transition duration-200"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href="tel:+919353090921" 
              className="text-indigo-200 hover:text-yellow-400 transition duration-200"
              aria-label="Phone"
            >
              <Phone className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/noorjahan04" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-200 hover:text-yellow-400 transition duration-200"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/noor-jahan-915987280" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-200 hover:text-yellow-400 transition duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <p className="text-sm text-indigo-200 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by Noor for the community.
          </p>
        </div>
      </div>
    </footer>
  )
}