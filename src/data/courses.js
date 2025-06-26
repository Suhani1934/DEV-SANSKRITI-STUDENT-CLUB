const courses = [
    'B.Tech Computer Science',
    'B.Tech Electronics',
    'B.Sc Mathematics',
    'B.Sc Physics',
    'BA English',
    'BBA',
    'MBA',
    'BCA',
    'MCA',
    'M.Tech Mechanical',
  ];
  
  export default courses.sort((a, b) => a.localeCompare(b));
  