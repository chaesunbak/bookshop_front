import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { StyledSignup } from "./Signup";

export interface SignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const { userResetPassword, userResetRequest, resetRequested } = useAuth();

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      // 초기화
      userResetPassword(data);
    } else {
      // 요청
      userResetRequest(data);
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <StyledSignup>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="eamil"
              inputMode="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                inputMode="text"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요.</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button size="medium" scheme="primary" type="submit">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
};

export default ResetPassword;
