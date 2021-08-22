import React, { useEffect } from 'react'
import createDOMPurify from 'dompurify'
import styled from 'styled-components'

const DOMPurify = createDOMPurify(window)

const rawHTML = `
<div id="stb_subscribe">
    <form action="https://stibee.com/api/v1.0/lists/zTTcV1LGklcfL-mClT5VEAnWvUWBaQ==/public/subscribers"
          method="POST"
          target="_blank"
          accept-charset="utf-8"
          className="stb_form"
          name="stb_subscribe_form"
          id="stb_subscribe_form"
          noValidate="">
        <h1 className="stb_form_title"></h1>
        <fieldset class="stb_form_set">
            <label htmlFor="stb_email" class="stb_form_set_label">
                이메일
                주소
            </label>
            <input type="email"
                   class="stb_form_set_input"
                   id="stb_email"
                   name="email"
                   required="required">
            <div class="stb_form_msg_error" id="stb_email_error"></div>
            <div class="stb_form_msg_error" id="stb_email_error"></div>
        </fieldset>
        <div class="stb_form_policy">
            <label>
                <input type="checkbox" id="stb_policy" value="stb_policy_true">
                <button id="stb_form_modal_open" data-modal="stb_form_policy_modal" class="stb_form_modal_open_btn"
                        type="button">
                    개인정보 수집 및 이용
                </button>
                에 동의합니다.
            </label>
            <div class="stb_form_msg_error" id="stb_policy_error"></div>
            <div class="stb_form_modal stb_form_policy_text blind" id="stb_form_policy_modal">
                <div class="stb_form_modal_body">
                    <h1 class="stb_form_modal_title">개인정보 수집 및 이용</h1>
                    <p class="stb_form_modal_text desktop">뉴스레터 발송을 위한 최소한의 개인정보를 수집하고 이용합니다.<br>수집된 정보는 발송 외 다른 목적으로 이용되지 않으며,<br>서비스가 종료되거나 구독을 해지할 경우 즉시 파기됩니다.
                    <p class="stb_form_modal_text mobile">뉴스레터 발송을 위한 최소한의 개인정보를 수집하고 이용합니다. 수집된 정보는 발송 외 다른 목적으로 이용되지 않으며, 서비스가 종료되거나 구독을 해지할 경우 즉시 파기됩니다.
                    </p>
                    <div class="stb_form_modal_btn">
                        <button id="stb_form_modal_close" class="stb_form_modal_close_btn"
                                data-modal="stb_form_policy_modal"
                                type="button">닫기
                        </button>
                    </div>
                </div>
                <div class="stb_form_modal_bg" id="stb_form_modal_bg"></div>
            </div>
        </div>
        <filedset class="stb_form_recaptcha"></filedset>
        <div class="stb_form_result" id="stb_form_result">
        </div>
        <fieldset class="stb_form_set_submit">
            <button type="submit" class="stb_form_submit_button" id="stb_form_submit_button"
                    style="background-color: rgb(255, 100, 100); color: rgb(255, 255, 255);">구독하기
            </button>
        </fieldset>
    </form>
</div>
`

const Subscribe = () => {

  useEffect(() => {
    const stibeeScript = document.createElement('script')

    stibeeScript.src = 'https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form.js'
    stibeeScript.async = true

    const recaptchaScript = document.createElement('script')
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js'
    recaptchaScript.async = true

    document.body.appendChild(stibeeScript)
    document.body.appendChild(recaptchaScript)
  }, [])

  return (
    <MGTSubscribe>
      {<div className="stibee-form-wrapper" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }}/>}
    </MGTSubscribe>
  )
}

const MGTSubscribe = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 4.7rem 0;

.stibee-form-wrapper {
flex-basis: 60%;

#stb_subscribe {
padding: 4.7rem 3rem;

.stb_form_policy  {
    label {
    display: flex;
    align-items: center;
    input {
    margin-right: 0.6rem !important;
    }
    }
}

#stb_form_policy_modal {
p.stb_form_modal_text {
white-space: pre-line !important;
&.mobile {
display: none;
}
}

.stb_form_modal_btn {
display: flex;
justify-content: flex-end;
}
}

.stb_form_set_submit {
display: flex;
justify-content: flex-end;
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
padding: 3.1rem 1.3rem;
.stibee-form-wrapper {
flex-basis: 100%;

#stb_subscribe {
p.stb_form_modal_text {
&.mobile {
display: block !important;
}
&.desktop {
display: none;
}
}
}
}
}
`

export default React.memo(Subscribe)
