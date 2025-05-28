import { defineComponent } from 'vue'
import styles from './index.module.scss'
// sample images
import imgCmdSample from '../../../assets/images/sample.png'
import imgProgressSample from '../../../assets/images/sample_progress.png'
import imgGraphSample1 from '../../../assets/images/sample_graph1.png'
import imgGraphSample2 from '../../../assets/images/sample_graph2.png'
import imgGraphSample3 from '../../../assets/images/sample_graph3.png'


const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={styles.outsideWrap}>
                    <div class={[styles.planBox,"contentBox"]}>
                        <div class="titleWrap flex-col"> 
                            <div class="title">계획</div>   
                            <div class="title-info">당일 실행 예정 작업의 실행 현황입니다.</div>   
                        </div>
                        <div class={styles.detailWrap}>
                            <div class={styles.circleProgressWrap}>
                                {/* circle progress 는 임시로 sample 이미지로 퍼블 적용 */}
                                <img src={imgProgressSample} alt="" />

                                <div class={styles.textPrgWrap}>
                                    <div class={styles.text}>실행</div>
                                    <div class={styles.value}>22.2%</div>                                    
                                </div>
                            </div>
                            <div class={styles.infoWrap}>
                                <div class={styles.dateText}>2025년 3월 25일</div>
                                <div class={styles.infoText}>
                                    총 <span>684</span>건의 스케줄 중 <span>152</span>건이 실행되었습니다.
                                </div>
                            </div>
                        </div>     
                    </div>
                    <div class={[styles.infoBox1,"contentBox"]}>
                        <div class="titleWrap"> 
                            <div class="title">실행현황</div>  
                        </div> 
                        <div class={styles.dataWrap}>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-run-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>실행중</div>
                                    <div class={styles.value}>100</div>
                                </div>
                            </div>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-error-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>실행오류</div>
                                    <div class={styles.value}>131</div>
                                </div>
                            </div>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-done-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>실행완료</div>
                                    <div class={styles.value}>85</div>
                                </div>
                            </div>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-expected-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>실행예정</div>
                                    <div class={styles.value}>22</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class={styles.centerWrap}>
                    <div class={styles.runtimeWrap}>
                        <div class={[styles.graphBox1,"contentBox"]}>
                            <div class="titleWrap flex-col"> 
                                <div class="title">평균실행시간</div>   
                                <div class="title-info">당일 기준 평균 실행시간 상위 5개 작업입니다.</div>   
                            </div> 
                            {/* 그래프 영역 - 임시 이미지로 퍼블 */}
                            <div class={styles.graphWrap}>
                                <img src={imgGraphSample1} alt="" />
                            </div>
                        </div>
                        <div class={[styles.graphBox1,"contentBox"]}>
                            <div class="titleWrap flex-col"> 
                                <div class="title">최대실행시간</div>   
                                <div class="title-info">당일 기준 최대 실행시간 상위 5개 작업입니다.</div>   
                            </div> 
                            {/* 그래프 영역 - 임시 이미지로 퍼블 */}
                            <div class={styles.graphWrap}>
                                <img src={imgGraphSample1} alt="" />
                            </div>
                        </div>                        
                    </div>
                    <div class={[styles.cmdBox,"contentBox"]}>
                        <img src={imgCmdSample} alt="" />
                    </div>
                </div>
                <div class={styles.outsideWrap}>
                    <div class={[styles.infoBox2,"contentBox"]}>
                        <div class="titleWrap flex-col"> 
                            <div class="title">시스템정보</div>   
                            <div class="title-info">작업 스케줄러 시스템 정보입니다.</div>   
                        </div> 
                        <div class={styles.dataWrap}>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-run-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>전체</div>
                                    <div class={styles.value}>100</div>
                                </div>
                            </div>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-done-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>활성</div>
                                    <div class={styles.value}>1,826</div>
                                </div>
                            </div>
                            <div class={styles.itemBox}>
                                <img src="" alt="" class="ic-error-48" />
                                <div class={styles.infoWrap}>
                                    <div class={styles.text}>비활성</div>
                                    <div class={styles.value}>8,833</div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div class={[styles.graphBox2,"contentBox"]}>
                        <div class="titleWrap flex-col"> 
                            <div class="title">그룹별현황</div>  
                            <div class="title-info">선택한 그룹의 하위 작업 실행 현황입니다.</div>    
                        </div> 
                        <div class={styles.graphWrap}>
                            <img src={imgGraphSample2} alt="" />
                        </div>
                    </div>
                    <div class={[styles.graphBox2,"contentBox"]}>
                        <div class="titleWrap flex-col"> 
                            <div class="title">기간별현황</div>   
                            <div class="title-info">선택한 기간의 작업 실행 현황입니다.</div>   
                        </div> 
                        <div class={styles.graphWrap}>
                            <img src={imgGraphSample3} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default publish1