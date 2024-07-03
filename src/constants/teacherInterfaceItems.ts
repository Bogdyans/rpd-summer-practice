import useStore from "../store/useStore";
import { RpdListItem } from "../types/RpdListTypes";

interface Competence {
    results: string;
    indicator: string;
    competence: string;
  }

function checkCompetencies(competencies: { [key: string]: Competence }){
    for (let key in competencies){
        let competence = competencies[key];
        if (!(validateField(competence.results)
                && validateField(competence.indicator)
                && validateField(competence.competence)
        )){
            return false;
        }
    }

    return true;
}

function checkResourceSupport(){ //Как надо можно настроить, я хз, как много книг надо просто
    const jsonData = useStore.getState().jsonData;

    if (jsonData.textbook.length < 1)
        return false;

    if (jsonData.additional_textbook.length < 1)
        return false;

    if (!(validateField(jsonData.professional_information_resources)
            && validateField(jsonData.logistics_template)
            && validateField(jsonData.software)
        ))
        return false;

    return true;
}

function validateField(text: string){
    let field = text;
    console.log(text);
    if (!field) //проверка на null и undefined
        return false;

    field = field.replace(/<\/?[a-z]+>/gi, '').replace(/&nbsp;/g, ' '); //удаляем возможные теги html и делаем норм пробелы

    let regex = /^[a-zA-Zа-яА-Я0-9-.,:;() ]+$/; //проверка на наличие текста
    if (!regex.test(field))
        return false;
    console.log(field);

    return true;
}

export const RpdListItems = () => {
    const jsonData = useStore.getState().jsonData;

    const RpdListItems: RpdListItem[] = [
        {
            id: "coverPage",
            text: "Титульный лист",
            isFilled: jsonData.disciplins_name
                            && jsonData.direction
                            && jsonData.profile
                            && jsonData.education_level
                            && jsonData.education_form
                            && jsonData.year
        },
        {
            id: "approvalPage",
            text: "Лист согласования (В разработке)",
            isFilled: false
        },
        {
            id: "aimsPage",
            text: "Цели и задачи освоения дисциплины",
            isFilled: validateField(jsonData.goals)
        },
        {
            id: "disciplinePlace",
            text: "Место дисциплины в структуре ОПОП",
            isFilled: jsonData.certification
                            && validateField(jsonData.place_more_text)
        },
        {
            id: "disciplinePlannedResults",
            text: "Планируемые результаты обучения по дисциплине (модулю)",
            isFilled: checkCompetencies(jsonData.competencies)
        },
        {
            id: "disciplineScope",
            text: "Объем дисциплины",
            isFilled: jsonData.zet
                            && jsonData.study_load
                            && jsonData.zet > 0
                           
        },
        {
            id: "disciplineContent",
            text: "Содержание дисциплины",
            isFilled: validateField(jsonData.content_template_more_text)
                            && validateField(jsonData.content_more_text)
                            && jsonData.content
        },
        {
            id: "disciplineSupport",
            text: "Перечень учебно-методического обеспечения по дисциплине",
            isFilled: validateField(jsonData.methodological_support_template)
        },
        {
            id: "disciplineEvaluationsFunds",
            text: "Фонды оценочных средств по дисциплине",
            isFilled: validateField(jsonData.assessment_tools_template)
        },
        {
            id: "resourceSupport",
            text: "Ресурсное обеспечение",
            isFilled: checkResourceSupport() // Настройка по усмотрению
        }
    ];

    

    return RpdListItems;
};