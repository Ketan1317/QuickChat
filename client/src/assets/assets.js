import avatar_icon from './avatar_icon.png';
import gallery_icon from './gallery_icon.svg';
import help_icon from './help_icon.png';
import logo_big from './logo_big.svg';
import logo from './logo.png';
import profile_richard from './profile_richard.png';
import profile_alison from './profile_alison.png';
import profile_enrique from './profile_enrique.png';
import profile_marco from './profile_marco.png';
import profile_martin from './profile_martin.png';
import search_icon from './search_icon.png';
import send_button from './send_button.svg';
import menu_icon from './menu_icon.png';
import arrow_icon from './arrow_icon.png';
import code from './code.svg';
import bgImage from './bgImage.svg';
import pic1 from './pic1.png';
import pic2 from './pic2.png';
import pic3 from './pic3.png';
import pic4 from './pic4.png';
import pic5 from './pic5.jpg';
import pic6 from './pic6.jpg';
import pic7 from './pic7.jpg';
import pic8 from './pic8.jpg';
import pic9 from './pic9.jpg';
import pic10 from './pic10.jpg';
import pic11 from './pic11.jpg';
import pic12 from './pic12.jpg';
import pic13 from './pic13.jpg';
import pic14 from './pic14.jpg';
import pic15 from './pic15.jpg';
import img1 from './img1.jpg';
import img2 from './img2.jpg';

const assets = {
  avatar_icon,
  gallery_icon,
  help_icon,
  logo_big,
  logo_icon: logo,
  search_icon,
  send_button,
  menu_icon,
  arrow_icon,
  code,
  bgImage,
  profile_martin,
};

export default assets;

export const imagesDummyData = [
  pic14, pic12, pic3, pic4, pic5, 
  pic6, pic7, pic8, pic9, pic10, 
  pic11, pic2, pic13, pic1, pic15,
];
export const userDummyData = [
  {
    _id: '680f50aaf10f3cd28382ecf2',
    email: 'test1@greatstack.dev',
    fullName: 'Emily Johnson',
    profilePic: profile_alison,
    bio: 'Hey there! Loving the QuickChat vibe 🚀',
  },
  {
    _id: '680f50e4f10f3cd28382ecf9',
    email: 'test2@greatstack.dev',
    fullName: 'Jake Anderson',
    profilePic: profile_martin,
    bio: 'QuickChat is where the magic happens ✨',
  },
  {
    _id: '680f510af10f3cd28382ed01',
    email: 'test3@greatstack.dev',
    fullName: 'Michael Brown',
    profilePic: profile_enrique,
    bio: 'Always up for a great conversation on QuickChat! 😊',
  },
  {
    _id: '680f5137f10f3cd28382ed10',
    email: 'test4@greatstack.dev',
    fullName: 'John Cena',
    profilePic: profile_marco,
    bio: 'QuickChat: The best place to connect and share ideas 💡',
  },
  {
    _id: '680f516cf10f3cd28382ed11',
    email: 'test5@greatstack.dev',
    fullName: 'David Miller',
    profilePic: profile_richard,
    bio: 'QuickChat + coffee = the ultimate duo ☕💬',
  },
];


export const messagesDummyData = [
  {
    _id: '680f571ff10f3cd28382f094',
    senderId: '680f5116f10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Aaj bahut thand hai, coffee piyenge? ☕',
    seen: true,
    createdAt: '2025-04-28T10:23:27.844Z',
  },
  {
    _id: '680f5726f10f3cd28382f0b1',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f5116f10f3cd28382ed02',
    text: 'Haan, chal Starbucks chalte hain! 😄',
    seen: true,
    createdAt: '2025-04-28T10:23:34.520Z',
  },
  {
    _id: '680f5729f10f3cd28382f0b6',
    senderId: '680f5116f10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Perfect! Waise kya plan hai weekend ka?',
    seen: true,
    createdAt: '2025-04-28T10:23:37.301Z',
  },
  {
    _id: '680f572cf10f3cd28382f0bb',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f5116f10f3cd28382ed02',
    text: 'Plan toh Goa ka hai, tum aaoge kya? 🌴',
    seen: true,
    createdAt: '2025-04-28T10:23:40.334Z',
  },
  {
    _id: '680f573cf10f3cd28382f0c0',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f5116f10f3cd28382ed02',
    image: img1,
    seen: true,
    createdAt: '2025-04-28T10:23:56.265Z',
  },
  {
    _id: '680f5745f10f3cd28382f0c5',
    senderId: '680f5116f10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    image: img2,
    seen: true,
    createdAt: '2025-04-28T10:24:05.164Z',
  },
  {
    _id: '680f5748f10f3cd28382f0ca',
    senderId: '680f5116f10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Wow, Goa ki pics mast hain! 😍',
    seen: true,
    createdAt: '2025-04-28T10:24:08.523Z',
  },
];
