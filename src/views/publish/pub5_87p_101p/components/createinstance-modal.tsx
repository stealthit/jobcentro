import { defineComponent } from 'vue'
import styles from './index.module.scss'
import DropdownList from '../../components/dropdownlist'

const CreateInstanceModal = defineComponent({
  name: 'CreateInstanceModal',
  render() {
    return (
      <div class={[styles.alarmBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Create Alarm Group</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          {/* 88p,89p 알람 인스턴스 생성1 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Alarm Instance Name</div>
            <input type='text' placeholder="Please enter your alert instance name" />
          </div>
          <div className="input-group">
            <div className="input-label">Is Global Instance</div>
            <div class="toggleBox">
              {/* input 이 checked 일때 on 상태 */}
              <input type="checkbox" id="toggle1"  class="ck-toggle" hidden /> 

              <label for="toggle1" class="toggleSwitch">
                <span class="toggleButton"></span>
              </label>
            </div>
          </div> 
          {/* 글로벌 서버 있을 경우 아래 항목 제외 */}
          <div className="input-group">
            <div className="input-label">Warning Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio1" checked />
                <span>sucess</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio1" />
                <span>failure</span>
              </label>              
              <label class='radioStyle'>
                <input type="radio" name="radio1" />
                <span>all</span>
              </label>              
            </div>
          </div> 
          {/* -------------------- */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Select plugin</div>
            <select class="selectBox">
              <option value="">Prometheus AlertManager</option>
              <option value="">Script</option>
              <option value="">Telegram</option>
              <option value="">WeChat</option>
              <option value="">Email</option>
              <option value="">Slack</option>
              <option value="">AliyunVoice</option>
              <option value="">Feishu</option>
              <option value="">Http</option>
              <option value="">DingTalk</option>
              <option value="">WebexTeams</option>
              <option value="">PagerDuty</option>
            </select>
          </div>

          {/* 90p 프로메테우스 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">URL</div>
            <input type='text' placeholder="Input request URL" />
          </div>
          <div className="input-group">
            <div className="input-label">Annotations</div>
            <input type='text' placeholder="Please input annotation in json form" />
          </div>
          <div className="input-group">
            <div className="input-label">GeneratorURL</div>
            <input type='text' placeholder="Please input Generator URL" />
          </div>
          {/* 91p 스크립트  */}
          <div className="input-group">
            <div className="input-label">User Params</div>
            <input type='text' placeholder="the custom parameters passed when calling scripts" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Script Path</div>
            <input type='text' placeholder="the absolute script path under alert-server, and make" />
          </div>
          <div className="input-group">
            <div className="input-label">Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio2" checked />
                <span>SHELL</span>
              </label>                       
            </div>
          </div> 
          {/* 92p 텔레그램 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">WebHook</div>
            <input type='text' placeholder="input WebHook Url" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Bot Token</div>
            <input type='text' placeholder="input bot access token" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Channel Chat Id</div>
            <input type='text' placeholder="input telegram channel chat Id" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Parse Mode</div>
            <select class="selectBox">
              <option value="">Txt</option>
              <option value="">Markdown</option>
              <option value="">MarkdownV2</option>
              <option value="">Html</option>
            </select>
          </div>  
          <div className="input-group">
            <div className="input-label">Enable Proxy</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio3" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio3" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">Proxy</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group flex-1">
              <div className="input-label">Port</div>
              <input type="number" name="" id="" placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">User</div>
            <input type='text' value="admin" />
          </div>
          <div className="input-group">
            <div className="input-label">Password</div>
            <input type='password' value="12345678" />
          </div>
          {/* 93p 위챗 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">CorpId</div>
            <input type='text' placeholder="please input corp Id" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Secret</div>
            <input type='text' placeholder="please input secret" />
          </div>
          <div className="input-group">
            <div className="input-label">Users</div>
            <input type='text' placeholder="use 'I' to separate userIds and '@all' to everyone" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">AgentId or ChartId</div>
            <input type='text' placeholder="please input agent id or chat id" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Send Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio4" checked />
                <span>APP</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio4" />
                <span>GROUP CHAT</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label ic-tit-nece">Slow Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio5" checked />
                <span>markdown</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio5" />
                <span>text</span>
              </label>                                         
            </div>
          </div> 
          {/* 94p 메일 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Receivers</div>
            <input type='text' placeholder="please input receivers" />
          </div>
          <div className="input-group">
            <div className="input-label">Receivers</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP Host</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP Port</div>
            <input type='number' value="25" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Sender</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP Auth</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio6" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio6" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">User</div>
            <input type='text' value="admin" />
          </div>
          <div className="input-group">
            <div className="input-label">Password</div>
            <input type='password' value="12345678" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP STARTTLS Enable</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio7" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio7" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP SSL Enable</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio8" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio8" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label ic-tit-nece">SMTP SSL Trust</div>
            <input type='text' value="*" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Show Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio9" checked />
                <span>table</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio9" />
                <span>text</span>
              </label>                                         
              <label class='radioStyle'>
                <input type="radio" name="radio9" />
                <span>attachment</span>
              </label>                                         
              <label class='radioStyle'>
                <input type="radio" name="radio9" />
                <span>table attachment</span>
              </label>                                         
            </div>
          </div>
          {/* 95p 슬랙  */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">WebHook</div>
            <input type='text' placeholder="input WebHook Url" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Username</div>
            <input type='text' placeholder="input the bot username" />
          </div>
          {/* 96p 알리바바보이스 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Call phone number</div>
            <input type='text' placeholder="input called number" />
          </div>
          <div className="input-group">
            <div className="input-label">Call display number</div>
            <input type='text' placeholder="please enter the call display number (the default number)" />
          </div>
          <div className="input-group">
            <div className="input-label">TTS Code</div>
            <input type='text' placeholder="please input tts code" />
          </div>
          <div className="input-group">
            <div className="input-label">Address</div>
            <input type='text' placeholder="please input aliyun viice address" />
          </div>
          <div className="input-group">
            <div className="input-label">AccessKeyId</div>
            <input type='text' placeholder="please input accessKeyId" />
          </div>
          <div className="input-group">
            <div className="input-label">AccessKeySecret</div>
            <input type='text' placeholder="please input accessKeySecret" />
          </div>
          {/* 97p Feishu 피슈 - 라크 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">WebHook</div>
            <input type='text' placeholder="input WebHook Url" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Enable Proxy</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio10" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio10" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">Proxy</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">Port</div>
            <input type='number' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">User</div>
            <input type='text' value="admin" />
          </div>
          <div className="input-group">
            <div className="input-label">Password</div>
            <input type='password' value="12345678" />
          </div>
          {/* 98p http */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">URL</div>
            <input type='text' placeholder="input request URL" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Request Type</div>
            <input type='text' placeholder="input request type POST or GET" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Headers</div>
            <input type='text' placeholder="input request headers as JSON format" />
          </div>
          <div className="input-group">
            <div className="input-label">Body</div>
            <input type='text' placeholder="input request body as JSON format" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Content Field</div>
            <input type='text' placeholder="input alert msg field name" />
          </div>
          <div className="input-group">
            <div className="input-label">Timeout(s)</div>
            <input type='number' value="120" />
          </div>
          {/* 99p 딩톡 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">WebHook</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">Keyword</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">Secret</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Msg Type</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio11" checked />
                <span>text</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio11" />
                <span>markdown</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">At User Mobiles</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">At User Ids</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">@All</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio12" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio12" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label ic-tit-nece">Enable Proxy</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio13" checked />
                <span>YES</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio13" />
                <span>NO</span>
              </label>                                         
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">Proxy</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">Port</div>
            <input type='number' placeholder="입력해 주세요" />
          </div>
          <div className="input-group">
            <div className="input-label">User</div>
            <input type='text' value="admin" />
          </div>
          <div className="input-group">
            <div className="input-label">User</div>
            <input type='password' value="12345678" />
          </div>
          {/* 100p 웨백스 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Bot Access Token</div>
            <input type='text' placeholder="Input bot access token" />
          </div>
          <div className="input-group">
            <div className="input-label">Room Id</div>
            <input type='text' placeholder="input the room ID the alert message send to" />
          </div>
          <div className="input-group">
            <div className="input-label">To Person Id</div>
            <input type='text' placeholder="input the person ID of the alert message recipient" />
          </div>
          <div className="input-group">
            <div className="input-label">To Person Email</div>
            <input type='text' placeholder="input the email address of the alert message recipient" />
          </div>
          <div className="input-group">
            <div className="input-label">At Someone In Room</div>
            <input type='text' placeholder="use ','(eng commas) to separate multiple emails, to.." />
          </div>
          <div className="input-group">
            <div className="input-label">Destination</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio14" checked />
                <span>roomId</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio14" />
                <span>personEmail</span>
              </label>                                         
              <label class='radioStyle'>
                <input type="radio" name="radio14" />
                <span>personId</span>
              </label>                                         
            </div>
          </div> 
          {/* 101p pagerduty */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Intergration Key</div>
            <input type='text' placeholder="입력해 주세요" />
          </div>
        </div>
        <div class="modalBottom">
          <button class="btnType1 modalBtnCancel">취소</button>
          <button class="btnType2 modalBtnRun">Test Connect</button>
          <button class="btnType2 modalBtnConfirm">확인</button>
        </div>

      </div>
    )
  }
})

export default CreateInstanceModal