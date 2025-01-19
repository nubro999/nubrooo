import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import AuthContext from '../contexts/AuthContext'; // AuthContext 경로를 실제 프로젝트에 맞게 수정

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // username 입력 필드
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // AuthContext에서 login 메서드 가져오기
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext가 정의되지 않았습니다. AuthProvider로 감싸져 있는지 확인하세요.');
    }

    const { login } = authContext;

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            // AuthContext의 login 메서드 호출
            await login(username, password);

            // 로그인 성공 시 홈으로 이동
            navigate('/');
        } catch (err: any) {
            // 에러 처리 (백엔드에서 반환된 에러 메시지 또는 기본 메시지 사용)
            const errorMessage = err.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
            setError(errorMessage);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="card w-full max-w-md">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

                    {/* 에러 메시지 표시 */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 아이디 입력 필드 */}
                        <div>
                            <label htmlFor="username" className="form-label">아이디</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 필드 */}
                        <div>
                            <label htmlFor="password" className="form-label">비밀번호</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 로그인 버튼 */}
                        <button type="submit" className="btn btn-primary w-full">
                            로그인
                        </button>
                    </form>

                    {/* 회원가입 링크 */}
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">계정이 없으신가요? </span>
                        <Link to="/register" className="text-blue-500 hover:underline">
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


