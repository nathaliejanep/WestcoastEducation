var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ApiService from './api-service.js';
export default class CourseService {
    constructor(url) {
        this.getCourseList = () => __awaiter(this, void 0, void 0, function* () {
            const http = new ApiService(`${this.url}/courses/`);
            const courses = yield http.get();
            console.log(courses);
            return courses;
        });
        this.getCourseDetails = (id) => __awaiter(this, void 0, void 0, function* () {
            const http = new ApiService(`${this.url}/courses/${id}`);
            const course = yield http.get();
            console.log(course);
            return course;
        });
        this.addCourse = (course) => __awaiter(this, void 0, void 0, function* () {
            const http = new ApiService(`${this.url}/courses/`);
            yield http.add(course);
        });
        this.deleteCourse = (id) => __awaiter(this, void 0, void 0, function* () {
            const http = new ApiService(`${this.url}/courses/${id}`);
            yield http.delete();
        });
        this.updateCourse = (id, updatedCourse) => __awaiter(this, void 0, void 0, function* () {
            const http = new ApiService(`${this.url}/courses/${id}`);
            yield http.edit(updatedCourse);
        });
        this.url = url;
    }
}
//# sourceMappingURL=course-service.js.map