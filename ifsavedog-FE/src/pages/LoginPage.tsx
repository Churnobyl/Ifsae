import { Input } from '@/components/index';

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="logo"></div>
      <div className="login">로그인</div>
      <div className="login-form">
        <Input name={'email'} placeholder="이메일을 입력해주세요" />
        <Input name={'password'} placeholder="비밀번호를 입력해주세요" />
        <button className="text-white w-full h-10 bg-main rounded-md border-none">
          <span>로그인</span>
        </button>
        <div className="flex flex-row justify-end">
          <div>비밀번호 초기화</div>
          <div> / </div>
          <div>회원가입</div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
