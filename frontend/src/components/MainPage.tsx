import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import homepageGuitar from '../image/homepageGuitar.jpg'; // 导入图片

const closeModal = () => {
  console.log('Modal closed');
};

const MainPage: React.FC = () => {
  const location = useLocation();

  return (
    <Box
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', // 确保覆盖整个视口宽度
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0' // 设置整个页面的背景颜色为浅灰色
      }}
    >
      <Box
        sx={{
          flex: '1 1 50%', // 图片占左侧50%
          backgroundImage: `url(${homepageGuitar})`,
          backgroundSize: 'cover', // 确保图片覆盖整个容器
          backgroundRepeat: 'no-repeat', // 防止重复
          backgroundPosition: 'center', // 居中显示
          height: '100%',
        }}
      />
      <Box
        sx={{
          flex: '1 1 50%', // 表单占右侧50%
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: '100%',
          paddingLeft: '50px', // 添加左填充
        }}
      >
        {location.pathname === '/register' ? <RegisterForm /> : <LoginForm closeModal={closeModal} />}
      </Box>
    </Box>
  );
};

export default MainPage;