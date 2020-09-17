import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book/book";
import {BookService} from "../../services/book/book.service";
import {Router} from "@angular/router";
import {OfficeService} from "../../services/office/office.service";
import {Office} from "../../model/office/office";

declare var $: any;

@Component({
  selector: 'app-overview-author',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  listOfBooks: Book[] = [];
  offices: Office[] = [];
  isAdmin: boolean;
  isUser: boolean;
  sortByTitle: boolean;
  sortByPageCount: boolean;
  sortByAuthor: boolean;
  sortByPublisher: boolean;
  currentIndex: number = 0;
  officeMissing: boolean;
  successfulUpdate: boolean;
  successfulDelete: boolean;
  patternFalse: boolean[] = [];
  isbnMissing: boolean[] = [];
  titleMissing: boolean[] = [];
  authorMissing: boolean[] = [];
  officeNameMissing: boolean[] = [];
  publisherMissing: boolean[] = [];
  descriptionMissing: boolean[] = [];
  pageCountMissing: boolean[] = [];
  releaseDateMissing: boolean[] = [];
  positionDescriptionMissing: boolean[] = [];
  wrongDate: boolean;

  constructor(private bookService: BookService,
              private officeService: OfficeService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("role") === null) {
      this.navigateToLogin();
    }
    this.prepareRouter();
    if (localStorage.getItem("role") === "ADMIN") {
      this.isAdmin = true;
    }
    if (localStorage.getItem("role") === "USER") {
      this.isUser = true;
    }
    if (localStorage.getItem("sortingCriteria") === null) {
      localStorage.setItem("sortingCriteria", "title");
    }
    this.sortingCriteriaDecision();
    if (this.sortByTitle) {
      this.bookService.getAll().subscribe(books => this.listOfBooks = books.sort((a, b) => this.compareTitles(a, b)));
      if (this.listOfBooks) {
        this.officeService.getOffices().subscribe(offices => {
          this.offices = offices;
          if (this.offices) {
            setTimeout(() => this.fillOfficesAndPrepareDates(), 150);
          }
        });
      }
    } else if (this.sortByPageCount) {
      this.bookService.getAll().subscribe(books => this.listOfBooks = books.sort((a, b) => a.pageCount - b.pageCount));
      if (this.listOfBooks) {
        this.officeService.getOffices().subscribe(offices => {
          this.offices = offices;
          if (this.offices) {
            setTimeout(() => this.fillOfficesAndPrepareDates(), 150);
          }
        });
      }

    } else if (this.sortByAuthor) {
      this.bookService.getAll().subscribe(books => {
        this.listOfBooks = books.sort((a, b) => this.compareAuthors(a, b));
      });

      if (this.listOfBooks) {
        this.officeService.getOffices().subscribe(offices => {
          this.offices = offices;
          if (this.offices) {
            setTimeout(() => this.fillOfficesAndPrepareDates(), 80);
          }
        });
      }
    } else if (this.sortByPublisher) {
      this.bookService.getAll().subscribe(books => this.listOfBooks = books.sort((a, b) => this.comparePublishers(a, b)));
      if (this.listOfBooks) {
        this.officeService.getOffices().subscribe(offices => {
          this.offices = offices;
          if (this.offices) {
            setTimeout(() => this.fillOfficesAndPrepareDates(), 80);
          }
        });
      }
    }
  }

  fillOfficesAndPrepareDates() {
    for (let i = 0; i < this.listOfBooks.length; i++) {
      // @ts-ignore
      this.listOfBooks[i].releaseDate = new Date(this.listOfBooks[i].releaseDate).toISOString().split('T')[0];
      // @ts-ignore
      this.listOfBooks[i].addingDate = new Date(this.listOfBooks[i].addingDate).toISOString().split('T')[0];

      for (let j = 0; j < this.offices.length; j++) {
        if (this.offices[j].officeId === this.listOfBooks[i].officeId) {
          this.listOfBooks[i].officeName = this.offices[j].name;
        }
      }
    }
  }

  compareTitles(a, b) {
    let aTitle = a.title.toLowerCase();
    let bTitle = b.title.toLowerCase();
    if (aTitle < bTitle) {
      return -1;
    } else if (aTitle > bTitle) {
      return 1;
    }
    return 0;
  }

  comparePublishers(a, b) {
    let aPublisher = a.publisher.toLowerCase();
    let bPublisher = b.publisher.toLowerCase();
    if (aPublisher < bPublisher) {
      return -1;
    } else if (aPublisher > bPublisher) {
      return 1;
    }
    return 0;
  }

  compareAuthors(a, b) {
    let aAuthor = a.author.toLowerCase();
    let bAuthor = b.author.toLowerCase();
    if (aAuthor < bAuthor) {
      return -1;
    } else if (aAuthor > bAuthor) {
      return 1;
    }
    return 0;
  }

  updateBook(i: number) {
    this.currentIndex = i;
    this.resetVariables();
    if (this.dataAcceptable(i)) {
      this.bookService.updateBook(this.listOfBooks[i], this.listOfBooks[i].addingDate, this.listOfBooks[i].releaseDate).subscribe((message) => {
        if (message === "Office Missing") {
          this.officeMissing = true;
        } else if (message === "Successful Update") {
          this.successfulUpdate = true;
        }
      }, () => {
        this.wrongDate = true;
      });
    }
    this.activateModal();
  }

  deleteBook(i: number) {
    this.resetVariables();
    this.bookService.delete(this.listOfBooks[i].id).subscribe(message => {
      if (message === true) {
        this.successfulDelete = true;
      } else {
        this.successfulDelete = false;
      }
    });
    this.activateModal();
  }

  dataAcceptable(i: number): boolean {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    const book = this.listOfBooks[i];
    if (regex.test(book.isbn.toString()) && book.officeName && book.title && book.positionDescription
      && book.pageCount && book.description && book.author && book.publisher && book.releaseDate) {
      return true;
    }
    return false;
  }

  setSelectedBookIsbn(i: number) {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    const book = this.listOfBooks[i];
    this.listOfBooks[i].isbn = $("#isbnTD" + i.toString()).text();
    if (!this.listOfBooks[i].isbn) {
      this.isbnMissing[i] = true;
    } else {
      this.isbnMissing[i] = false;
    }
    if (regex.test(book.isbn.toString())) {
      this.patternFalse[i] = false;
    } else {
      this.patternFalse[i] = true;
    }
    this.currentIndex = i;
  }

  setSelectedBookTitle(i: number) {
    this.listOfBooks[i].title = $("#titleTD" + i.toString()).text();
    if (!this.listOfBooks[i].title) {
      this.titleMissing[i] = true;
    } else {
      this.titleMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookAuthor(i: number) {
    this.listOfBooks[i].author = $("#authorTD" + i.toString()).text();
    if (!this.listOfBooks[i].author) {
      this.authorMissing[i] = true;
    } else {
      this.authorMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookPublisher(i: number) {
    this.listOfBooks[i].publisher = $("#publisherTD" + i.toString()).text();
    if (!this.listOfBooks[i].publisher) {
      this.publisherMissing[i] = true;
    } else {
      this.publisherMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookDescription(i: number) {
    this.listOfBooks[i].description = $("#descriptionTD" + i.toString()).text();
    if (!this.listOfBooks[i].description) {
      this.descriptionMissing[i] = true;
    } else {
      this.descriptionMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookReleaseDate(i: number) {
    this.listOfBooks[i].releaseDate = $("#releaseDateTD" + i.toString()).text();
    if (!this.listOfBooks[i].releaseDate) {
      this.releaseDateMissing[i] = true;
    } else {
      this.releaseDateMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookPageCount(i: number) {
    this.listOfBooks[i].pageCount = $("#pageCountTD" + i.toString()).text();
    if (!this.listOfBooks[i].pageCount) {
      this.pageCountMissing[i] = true;
    } else {
      this.pageCountMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookPositionDescription(i: number) {
    this.listOfBooks[i].positionDescription = $("#positionDescriptionTD" + i.toString()).text();
    if (!this.listOfBooks[i].positionDescription) {
      this.positionDescriptionMissing[i] = true;
    } else {
      this.positionDescriptionMissing[i] = false;
    }
    this.currentIndex = i;
  }

  setSelectedBookOfficeName(i: number) {
    this.listOfBooks[i].officeName = $("#officeNameTD" + i.toString()).text();
    if (!this.listOfBooks[i].officeName) {
      this.officeNameMissing[i] = true;
    } else {
      this.officeNameMissing[i] = false;
    }
    this.currentIndex = i;
  }

  sortingCriteriaDecision() {
    const sortingCriteria = localStorage.getItem("sortingCriteria");
    this.sortByAuthor = false;
    this.sortByPageCount = false;
    this.sortByTitle = false;
    this.sortByPublisher = false;
    if (sortingCriteria === 'publisher') {
      this.sortByPublisher = true;
    }
    if (sortingCriteria === 'author') {
      this.sortByAuthor = true;
    }
    if (sortingCriteria === 'title') {
      this.sortByTitle = true;
    }
    if (sortingCriteria === 'page count') {
      this.sortByPageCount = true;
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  redirectToOfficeCreation() {
    $('#modal').modal("hide");
    localStorage.setItem("officeName", $("#officeNameTD" + this.currentIndex.toString()).text());
    this.router.navigate(['addOffice']);
  }

  activateModal() {
    $('#modal').modal({backdrop: 'static', keyboard: false});
  }

  resetVariables() {
    this.wrongDate = false;
    this.successfulDelete = false;
    this.successfulUpdate = false;
    this.officeMissing = false;
  }

  updateAfterDelete() {
    this.router.navigate(['overview']);
  }

  prepareRouter(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload';
  }
}
