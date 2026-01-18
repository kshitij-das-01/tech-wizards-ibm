/**
 * Examination Portal - FIXED LOGIN VERSION
 * Issue Fixed: Properly initialized this.elements object
 */

class ExamPortal {
    constructor() {
        // Initialize elements object FIRST
        this.elements = {};
        
        // Timer configuration (30 minutes = 1800 seconds)
        this.TOTAL_TIME = 1800;
        
        // Questions by subject (5 per subject, total 15)
        this.questions = {
            cprog: [
                {id: 'cprog_q1', q: 'What does printf() return?', opts: ['Number of chars printed', 'Nothing', 'Boolean', 'String length'], correct: 0},
                {id: 'cprog_q2', q: 'Array index starts from?', opts: ['1', '0', '-1', 'Any positive'], correct: 1},
                {id: 'cprog_q3', q: '"int" size on most systems?', opts: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'], correct: 1},
                {id: 'cprog_q4', q: 'Which is not a loop?', opts: ['for', 'while', 'switch', 'do-while'], correct: 2},
                {id: 'cprog_q5', q: 'malloc() purpose?', opts: ['Memory allocation', 'File handling', 'String ops', 'Math ops'], correct: 0}
            ],
            coa: [
                {id: 'coa_q1', q: 'CPU fetches from?', opts: ['RAM', 'Cache', 'Registers', 'Disk'], correct: 2},
                {id: 'coa_q2', q: 'Pipeline stages typical?', opts: ['2', '3', '4-5', '10+'], correct: 2},
                {id: 'coa_q3', q: 'ALU stands for?', opts: ['Arithmetic Logic Unit', 'Address Logic Unit', 'Advanced Logic Unit', 'Arithmetic Load Unit'], correct: 0},
                {id: 'coa_q4', q: 'Cache memory type?', opts: ['Volatile', 'Non-volatile', 'Both', 'None'], correct: 0},
                {id: 'coa_q5', q: 'Von Neumann feature?', opts: ['Separate memory', 'Shared memory', 'No memory', 'Cache only'], correct: 1}
            ],
            frontend: [
                {id: 'fe_q1', q: 'CSS stands for?', opts: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Color Style Sheets'], correct: 1},
                {id: 'fe_q2', q: 'Flexbox main axis?', opts: ['align-items', 'justify-content', 'flex-direction', 'All above'], correct: 1},
                {id: 'fe_q3', q: 'Semantic HTML helps?', opts: ['Performance', 'SEO', 'File size', 'Speed'], correct: 1},
                {id: 'fe_q4', q: '"display: flex" creates?', opts: ['Block', 'Inline', 'Flex container', 'Table'], correct: 2},
                {id: 'fe_q5', q: 'CSS framework example?', opts: ['Python', 'Bootstrap', 'Java', 'MySQL'], correct: 1}
            ]
        };

        // App state
        this.state = {
            currentSubject: 'cprog',
            currentQuestion: 0,
            timeLeft: this.TOTAL_TIME,
            timerInterval: null,
            userAnswers: {},
            examSubmitted: false
        };

        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadState();
    }

    cacheElements() {
        // FIXED: Safe element caching with error handling
        const ids = ['loginScreen', 'examContainer', 'loginForm', 'username', 'password', 'loginError',
                    'timerDisplay', 'questionCounter', 'questionText', 'optionsContainer', 
                    'questionGrid', 'prevBtn', 'nextBtn', 'submitBtn', 'resultsModal', 'scoreDisplay', 'restartBtn'];
        
        ids.forEach(id => {
            this.elements[id] = document.getElementById(id);
            if (!this.elements[id]) {
                console.error(`Element not found: ${id}`);
            }
        });
    }

    bindEvents() {
        // FIXED: Safe event binding
        if (this.elements.loginForm) {
            this.elements.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Subject tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSubject(e.target.dataset.subject));
        });
        
        // Navigation
        if (this.elements.prevBtn) this.elements.prevBtn.addEventListener('click', () => this.prevQuestion());
        if (this.elements.nextBtn) this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        if (this.elements.submitBtn) this.elements.submitBtn.addEventListener('click', () => this.submitExam());
        if (this.elements.restartBtn) this.elements.restartBtn.addEventListener('click', () => this.restartExam());

        // Question nav grid & radio buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('question-nav-btn')) {
                this.goToQuestion(parseInt(e.target.textContent) - 1);
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name === 'answer') {
                this.saveAnswer(parseInt(e.target.value));
            }
        });
    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // FIXED: Direct DOM access for reliability
        if (username === 'student' && password === 'exam123') {
            if (this.elements.loginScreen) {
                this.elements.loginScreen.classList.remove('active');
            }
            if (this.elements.examContainer) {
                this.elements.examContainer.classList.add('active');
            }
            this.startExam();
        } else {
            if (this.elements.loginError) {
                this.elements.loginError.textContent = 'Invalid: use student/exam123';
            }
        }
    }

    startExam() {
        this.requestFullscreen();
        this.renderQuestionNav();
        this.renderQuestion();
        this.startTimer();
        this.updateNavButtons();
    }

    requestFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    }

    startTimer() {
        this.state.timerInterval = setInterval(() => {
            this.state.timeLeft--;
            this.updateTimer();
            if (this.state.timeLeft <= 0) {
                this.submitExam();
            }
        }, 1000);
    }

    updateTimer() {
        const min = Math.floor(this.state.timeLeft / 60);
        const sec = this.state.timeLeft % 60;
        
        if (this.elements.timerDisplay) {
            this.elements.timerDisplay.textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
            this.elements.timerDisplay.className = 'timer-display';
            if (this.state.timeLeft <= 60) this.elements.timerDisplay.classList.add('timer-danger');
            else if (this.state.timeLeft <= 120) this.elements.timerDisplay.classList.add('timer-warning');
        }
    }

    switchSubject(subject) {
        if (subject !== this.state.currentSubject) {
            this.state.currentSubject = subject;
            this.state.currentQuestion = 0;
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-subject="${subject}"]`).classList.add('active');
            this.renderQuestionNav();
            this.renderQuestion();
            this.updateNavButtons();
        }
    }

    renderQuestion() {
        const q = this.questions[this.state.currentSubject][this.state.currentQuestion];
        if (this.elements.questionCounter) {
            this.elements.questionCounter.textContent = `Q${this.state.currentQuestion + 1}/5 - ${q.id}`;
        }
        if (this.elements.questionText) {
            this.elements.questionText.textContent = q.q;
        }
        
        if (this.elements.optionsContainer) {
            this.elements.optionsContainer.innerHTML = q.opts.map((opt, i) => {
                const selected = this.state.userAnswers[q.id] === i;
                return `
                    <label class="option ${selected ? 'selected' : ''}">
                        <input type="radio" name="answer" value="${i}" ${selected ? 'checked' : ''}>
                        <span>${String.fromCharCode(65 + i)}. ${opt}</span>
                    </label>
                `;
            }).join('');
        }
    }

    renderQuestionNav() {
        const questions = this.questions[this.state.currentSubject];
        if (this.elements.questionGrid) {
            this.elements.questionGrid.innerHTML = questions.map((q, i) => {
                const answered = this.state.userAnswers[q.id] !== undefined;
                const classes = ['question-nav-btn', 
                    answered ? 'answered' : '',
                    i === this.state.currentQuestion ? 'current' : ''
                ].filter(Boolean).join(' ');
                return `<button class="${classes}">${i + 1}</button>`;
            }).join('');
        }
    }

    saveAnswer(answerIndex) {
        const q = this.questions[this.state.currentSubject][this.state.currentQuestion];
        this.state.userAnswers[q.id] = answerIndex;
        this.saveState();
        this.renderQuestionNav();
        this.renderQuestion();
    }

    goToQuestion(index) {
        this.state.currentQuestion = index;
        this.renderQuestion();
        this.updateNavButtons();
        this.renderQuestionNav();
    }

    nextQuestion() {
        if (this.state.currentQuestion < 4) {
            this.state.currentQuestion++;
            this.renderQuestion();
            this.updateNavButtons();
            this.renderQuestionNav();
        }
    }

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion();
            this.updateNavButtons();
            this.renderQuestionNav();
        }
    }

    updateNavButtons() {
        if (this.elements.prevBtn) {
            this.elements.prevBtn.disabled = this.state.currentQuestion === 0;
        }
        if (this.elements.nextBtn) {
            this.elements.nextBtn.disabled = this.state.currentQuestion === 4;
        }
    }

    submitExam() {
        if (this.state.examSubmitted) return;
        this.state.examSubmitted = true;
        
        clearInterval(this.state.timerInterval);
        if (document.exitFullscreen) document.exitFullscreen();

        let score = 0;
        Object.keys(this.state.userAnswers).forEach(qId => {
            const q = Object.values(this.questions).flat().find(q => q.id === qId);
            if (q && this.state.userAnswers[qId] === q.correct) score++;
        });

        if (this.elements.scoreDisplay) {
            this.elements.scoreDisplay.textContent = `${score}/15 (${Math.round(score/15*100)}%)`;
        }
        if (this.elements.resultsModal) {
            this.elements.resultsModal.style.display = 'flex';
        }
        this.saveState();
    }

    restartExam() {
        Object.assign(this.state, {
            currentSubject: 'cprog',
            currentQuestion: 0,
            timeLeft: this.TOTAL_TIME,
            timerInterval: null,
            userAnswers: {},
            examSubmitted: false
        });
        if (this.elements.resultsModal) {
            this.elements.resultsModal.style.display = 'none';
        }
        if (this.elements.examContainer) {
            this.elements.examContainer.classList.remove('active');
        }
        if (this.elements.loginScreen) {
            this.elements.loginScreen.classList.add('active');
        }
        if (this.elements.loginForm) {
            this.elements.loginForm.reset();
        }
        if (this.elements.loginError) {
            this.elements.loginError.textContent = '';
        }
        this.updateTimer();
    }

    saveState() { 
        localStorage.setItem('examState', JSON.stringify(this.state)); 
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem('examState');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(this.state, parsed);
            }
        } catch (e) {
            console.log('No valid saved state found');
        }
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExamPortal();
});
