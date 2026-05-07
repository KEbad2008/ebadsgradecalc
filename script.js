let assign_count = 0;
let course_count = 0;
function switch_tab(event, name) {
  document.querySelectorAll('.page')
    .forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab')
    .forEach(t => t.classList.remove('active'));
  document.getElementById('page_' + name)
    .classList.add('active');
  event.target.classList.add('active');
}

function remove_row(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
function show_err(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = msg
    ? 'block'
    : 'none';
}

function get_letter(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 85) return 'A';
  if (pct >= 80) return 'A-';
  if (pct >= 77) return 'B+';
  if (pct >= 73) return 'B';
  if (pct >= 70) return 'B-';
  if (pct >= 67) return 'C+';
  if (pct >= 63) return 'C';
  if (pct >= 60) return 'C-';
  if (pct >= 57) return 'D+';
  if (pct >= 53) return 'D';
  if (pct >= 50) return 'D-';
  return 'F';
}
// note to self that pct means percentage.
function pct_to_gpa(pct) {

  if (pct >= 90) return 4.0;
  if (pct >= 85) return 3.9;
  if (pct >= 80) return 3.7;
  if (pct >= 77) return 3.3;
  if (pct >= 73) return 3.0;
  if (pct >= 70) return 2.7;
  if (pct >= 67) return 2.3;
  if (pct >= 63) return 2.0;
  if (pct >= 60) return 1.7;
  if (pct >= 57) return 1.3;
  if (pct >= 53) return 1.0;
  if (pct >= 50) return 0.7;

  return 0.0;
}

function add_assignment() {
  assign_count++;
  const div = document.createElement('div');
  div.className = 'course_row';
  div.id = 'assign_' + assign_count;
  div.innerHTML = `
    <input type="text" placeholder="e.g. Midterm">
    <input type="number"
      placeholder="85"
      id="apct_${assign_count}">
    <input type="number"
      placeholder="20"
      id="awt_${assign_count}">
    <button class="del_btn"
      onclick="remove_row('assign_${assign_count}')">
      ×
    </button>
  `;
  document.getElementById('assignments_list_rows')
    .appendChild(div);
}
function calc_final() {
  show_err('err_final', '');
  const rows = document.querySelectorAll(
    '#assignments_list_rows .course_row'
  );
  let weighted_total = 0;
  let total_weight = 0;
  let count = 0;
  rows.forEach(function(row) {
    const id = row.id.replace('assign_', '');
    const pct = parseFloat(
      document.getElementById('apct_' + id).value
    );



    const wt = parseFloat(
      document.getElementById('awt_' + id).value
    );


    if (!isNaN(pct) && !isNaN(wt)) {
      weighted_total += pct * wt;
      total_weight += wt;
      count++;
    }
  });

  if (count === 0) {
    show_err(
      'err_final',
      'Enter at least one assignment.'
    );
    return;
  }
  const avg = weighted_total / total_weight;
  document.getElementById('final_pct')
    .textContent = avg.toFixed(1) + '%';
  document.getElementById('final_letter')
    .textContent = get_letter(avg);
  document.getElementById('final_result_label')
    .textContent = 'Final Grade';
  document.getElementById('final_result')
    .classList.add('show');
}

function calc_needed() {
  show_err('err_needed', '');
  const cur = parseFloat(
    document.getElementById('cur_grade').value
  );

  const weight = parseFloat(
    document.getElementById('exam_weight').value
  );
  const target = parseFloat(
    document.getElementById('target_grade').value
  );
  if (isNaN(cur) || isNaN(weight) || isNaN(target)) {
    show_err(
      'err_needed',
      'Fill in all fields.'
    );
    return;
  }
  const cur_weight = 100 - weight;
  const needed =
    (target - (cur * cur_weight / 100))
    / (weight / 100);
  document.getElementById('needed_num')
    .textContent = needed.toFixed(1) + '%';
  document.getElementById('needed_lbl')
    .textContent = 'needed on your final exam';
  document.getElementById('needed_result')
    .classList.add('show');
}
function add_course() {
  course_count++;
  const div = document.createElement('div');
  div.className = 'course_row two_col';
  div.id = 'course_' + course_count;
  div.innerHTML = `
    <input type="text" placeholder="e.g. Math">
    <input type="number"
      placeholder="%"
      id="cpct_${course_count}">

    <button class="del_btn"
      onclick="remove_row('course_${course_count}')">
      ×
    </button>
  `;
  document.getElementById('courses_list')
    .appendChild(div);
}
function calc_gpa() {
  show_err('err_gpa', '');
  const rows = document.querySelectorAll(
    '#courses_list .course_row'
  );
  let total_pct = 0;
  let total_gpa = 0;
  let count = 0;

  rows.forEach(function(row) {
    const id = row.id.replace('course_', '');
    const pct = parseFloat(
      document.getElementById('cpct_' + id).value
    );
    if (!isNaN(pct)) {
      total_pct += pct;
      total_gpa += pct_to_gpa(pct);
      count++;
    }
  });
  if (count === 0) {
    show_err(
      'err_gpa',
      'Enter at least one course grade.'
    );
    return;
  }
  const avg_pct = total_pct / count;
  const avg_gpa = total_gpa / count;
  document.getElementById('gpa_num')
    .textContent = avg_gpa.toFixed(2);
  document.getElementById('gpa_avg')
    .textContent = avg_pct.toFixed(1) + '%';
  document.getElementById('gpa_letter')
    .textContent = get_letter(avg_pct);
  document.getElementById('gpa_result')
    .classList.add('show');
}





add_assignment();
add_assignment();
add_assignment();
add_course();
add_course();
